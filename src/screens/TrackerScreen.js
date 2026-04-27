import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, TextInput, Alert, Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const WATER_GLASS_SIZE = 250; // ml
const DAILY_WATER_GOAL = 3000; // ml
const TRACKER_KEY = '@yogafit_tracker';

export default function TrackerScreen() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  // Separate states for BMI and weight log
  const [bmiWeight, setBmiWeight] = useState('');
  const [height, setHeight] = useState('');
  const [logWeightInput, setLogWeightInput] = useState('');
  const [weightLog, setWeightLog] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState('');

  // Load saved data on mount
  useEffect(() => {
    loadTrackerData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    saveTrackerData();
  }, [weightLog, waterIntake, sleepHours]);

  const loadTrackerData = async () => {
    try {
      const saved = await AsyncStorage.getItem(TRACKER_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        // Only restore today's water intake
        const today = new Date().toDateString();
        if (data.waterDate === today) {
          setWaterIntake(data.waterIntake || 0);
        }
        setWeightLog(data.weightLog || []);
        setSleepHours(data.sleepHours || '');
        setBmiWeight(data.bmiWeight || '');
        setHeight(data.height || '');
      }
    } catch (e) {
      console.log('Failed to load tracker data');
    }
  };

  const saveTrackerData = async () => {
    try {
      const data = {
        weightLog,
        waterIntake,
        waterDate: new Date().toDateString(),
        sleepHours,
        bmiWeight,
        height,
      };
      await AsyncStorage.setItem(TRACKER_KEY, JSON.stringify(data));
    } catch (e) {
      console.log('Failed to save tracker data');
    }
  };

  const addWater = () => {
    setWaterIntake(prev => prev + WATER_GLASS_SIZE);
  };

  const logWeight = () => {
    if (!logWeightInput || isNaN(logWeightInput)) {
      Alert.alert(isHindi ? 'त्रुटि' : 'Error', isHindi ? 'वज़न दर्ज करें' : 'Enter valid weight');
      return;
    }
    const today = new Date().toLocaleDateString();
    setWeightLog(prev => [...prev, { date: today, weight: parseFloat(logWeightInput) }]);
    setLogWeightInput('');
    Alert.alert('✅', isHindi ? 'वज़न दर्ज हो गया!' : 'Weight logged!');
  };

  const resetWater = () => {
    setWaterIntake(0);
  };

  const calculateBMI = () => {
    if (!bmiWeight || !height) return null;
    const h = parseFloat(height) / 100;
    const w = parseFloat(bmiWeight);
    if (h <= 0 || w <= 0) return null;
    const bmi = (w / (h * h)).toFixed(1);
    let category = '';
    let categoryHi = '';
    let color = COLORS.success;
    if (bmi < 18.5) { category = 'Underweight'; categoryHi = 'कम वज़न'; color = COLORS.info; }
    else if (bmi < 25) { category = 'Normal'; categoryHi = 'सामान्य'; color = COLORS.success; }
    else if (bmi < 30) { category = 'Overweight'; categoryHi = 'अधिक वज़न'; color = COLORS.warning; }
    else { category = 'Obese'; categoryHi = 'मोटापा'; color = COLORS.error; }
    return { value: bmi, category, categoryHi, color };
  };

  const bmi = calculateBMI();
  const waterPercent = Math.min((waterIntake / DAILY_WATER_GOAL) * 100, 100);

  // Weekly weight chart data (last 7 entries)
  const weeklyData = weightLog.slice(-7);
  const maxWeight = weeklyData.length > 0 ? Math.max(...weeklyData.map(e => e.weight)) : 100;
  const minWeight = weeklyData.length > 0 ? Math.min(...weeklyData.map(e => e.weight)) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{isHindi ? '📊 स्वास्थ्य ट्रैकर' : '📊 Health Tracker'}</Text>
          <Text style={styles.subtitle}>{isHindi ? 'अपनी प्रगति ट्रैक करें' : 'Track your progress'}</Text>
        </View>

        {/* BMI Calculator */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{isHindi ? '🔢 BMI कैलकुलेटर' : '🔢 BMI Calculator'}</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{isHindi ? 'वज़न (kg)' : 'Weight (kg)'}</Text>
              <TextInput
                style={styles.input}
                value={bmiWeight}
                onChangeText={setBmiWeight}
                keyboardType="numeric"
                placeholder="70"
                placeholderTextColor={COLORS.textLight}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{isHindi ? 'ऊंचाई (cm)' : 'Height (cm)'}</Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="170"
                placeholderTextColor={COLORS.textLight}
              />
            </View>
          </View>
          {bmi && (
            <View style={[styles.bmiResult, { borderColor: bmi.color }]}>
              <Text style={[styles.bmiValue, { color: bmi.color }]}>{bmi.value}</Text>
              <Text style={[styles.bmiCategory, { color: bmi.color }]}>
                {isHindi ? bmi.categoryHi : bmi.category}
              </Text>
            </View>
          )}
        </View>

        {/* Water Tracker */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{isHindi ? '💧 पानी ट्रैकर' : '💧 Water Tracker'}</Text>
          <View style={styles.waterProgress}>
            <View style={styles.waterBar}>
              <View style={[styles.waterFill, { width: `${waterPercent}%` }]} />
            </View>
            <Text style={styles.waterText}>
              {waterIntake}ml / {DAILY_WATER_GOAL}ml ({Math.round(waterPercent)}%)
            </Text>
          </View>
          <View style={styles.waterButtons}>
            <TouchableOpacity style={styles.waterBtn} onPress={addWater}>
              <Text style={styles.waterBtnText}>+ 1 {isHindi ? 'गिलास' : 'Glass'} (250ml)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.waterBtn, styles.waterBtnReset]} onPress={resetWater}>
              <Text style={styles.waterBtnTextReset}>{isHindi ? 'रीसेट' : 'Reset'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.waterTip}>
            {isHindi ? '💡 रोज़ 8-12 गिलास पानी पिएं' : '💡 Drink 8-12 glasses daily'}
          </Text>
        </View>

        {/* Weight Log */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{isHindi ? '⚖️ वज़न लॉग' : '⚖️ Weight Log'}</Text>
          <View style={styles.weightInputRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={logWeightInput}
              onChangeText={setLogWeightInput}
              keyboardType="numeric"
              placeholder={isHindi ? 'वज़न (kg)' : 'Weight (kg)'}
              placeholderTextColor={COLORS.textLight}
            />
            <TouchableOpacity style={styles.logBtn} onPress={logWeight}>
              <Text style={styles.logBtnText}>{isHindi ? 'दर्ज करें' : 'Log'}</Text>
            </TouchableOpacity>
          </View>
          {weightLog.length > 0 && (
            <View style={styles.logList}>
              {weightLog.slice(-5).reverse().map((entry, index) => (
                <View key={index} style={styles.logEntry}>
                  <Text style={styles.logDate}>{entry.date}</Text>
                  <Text style={styles.logWeight}>{entry.weight} kg</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Weekly Weight Chart */}
        {weeklyData.length >= 2 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{isHindi ? '📈 साप्ताहिक प्रगति' : '📈 Weekly Progress'}</Text>
            <View style={styles.chartContainer}>
              {weeklyData.map((entry, index) => {
                const range = maxWeight - minWeight || 1;
                const heightPercent = ((entry.weight - minWeight) / range) * 60 + 40;
                return (
                  <View key={index} style={styles.chartBar}>
                    <Text style={styles.chartValue}>{entry.weight}</Text>
                    <View style={styles.chartBarTrack}>
                      <View style={[styles.chartBarFill, { height: `${heightPercent}%` }]} />
                    </View>
                    <Text style={styles.chartLabel}>{entry.date.split('/')[1] || entry.date}</Text>
                  </View>
                );
              })}
            </View>
            {weeklyData.length >= 2 && (
              <Text style={styles.chartSummary}>
                {weeklyData[weeklyData.length - 1].weight > weeklyData[0].weight
                  ? (isHindi ? `📈 ${(weeklyData[weeklyData.length - 1].weight - weeklyData[0].weight).toFixed(1)} kg बढ़ा` : `📈 Gained ${(weeklyData[weeklyData.length - 1].weight - weeklyData[0].weight).toFixed(1)} kg`)
                  : weeklyData[weeklyData.length - 1].weight < weeklyData[0].weight
                  ? (isHindi ? `📉 ${(weeklyData[0].weight - weeklyData[weeklyData.length - 1].weight).toFixed(1)} kg घटा` : `📉 Lost ${(weeklyData[0].weight - weeklyData[weeklyData.length - 1].weight).toFixed(1)} kg`)
                  : (isHindi ? '➡️ वज़न स्थिर' : '➡️ Weight stable')}
              </Text>
            )}
          </View>
        )}

        {/* Sleep Tracker */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{isHindi ? '😴 नींद ट्रैकर' : '😴 Sleep Tracker'}</Text>
          <View style={styles.sleepRow}>
            <Text style={styles.sleepLabel}>{isHindi ? 'पिछली रात की नींद:' : 'Last night sleep:'}</Text>
            <TextInput
              style={[styles.input, { width: 80 }]}
              value={sleepHours}
              onChangeText={setSleepHours}
              keyboardType="numeric"
              placeholder="7"
              placeholderTextColor={COLORS.textLight}
            />
            <Text style={styles.sleepUnit}>{isHindi ? 'घंटे' : 'hours'}</Text>
          </View>
          {sleepHours && (
            <View style={styles.sleepFeedback}>
              <Text style={styles.sleepFeedbackText}>
                {parseFloat(sleepHours) >= 7
                  ? (isHindi ? '✅ अच्छी नींद!' : '✅ Good sleep!')
                  : (isHindi ? '⚠️ 7-8 घंटे की नींद ज़रूरी है' : '⚠️ Aim for 7-8 hours')}
              </Text>
            </View>
          )}
        </View>

        {/* Daily Summary */}
        <View style={[styles.card, styles.summaryCard]}>
          <Text style={styles.cardTitle}>{isHindi ? '📋 आज का सारांश' : "📋 Today's Summary"}</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{isHindi ? '💧 पानी' : '💧 Water'}</Text>
            <Text style={styles.summaryValue}>{waterIntake}ml</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{isHindi ? '⚖️ वज़न' : '⚖️ Weight'}</Text>
            <Text style={styles.summaryValue}>{weightLog.length > 0 ? weightLog[weightLog.length - 1].weight + ' kg' : (bmiWeight ? bmiWeight + ' kg' : '-')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{isHindi ? '😴 नींद' : '😴 Sleep'}</Text>
            <Text style={styles.summaryValue}>{sleepHours ? sleepHours + ' hrs' : '-'}</Text>
          </View>
          {bmi && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{isHindi ? '🔢 BMI' : '🔢 BMI'}</Text>
              <Text style={[styles.summaryValue, { color: bmi.color }]}>{bmi.value} ({isHindi ? bmi.categoryHi : bmi.category})</Text>
            </View>
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SIZES.padding, paddingTop: 20, paddingBottom: 10 },
  title: { fontSize: SIZES.title, fontWeight: '800', color: COLORS.text },
  subtitle: { fontSize: SIZES.sm, color: COLORS.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginTop: 14,
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  cardTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  inputRow: { flexDirection: 'row', gap: 12 },
  inputGroup: { flex: 1 },
  inputLabel: { fontSize: SIZES.sm, color: COLORS.textSecondary, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
    fontSize: SIZES.md,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bmiResult: {
    marginTop: 14,
    padding: 16,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: COLORS.surfaceAlt,
  },
  bmiValue: { fontSize: SIZES.h1, fontWeight: '800' },
  bmiCategory: { fontSize: SIZES.base, fontWeight: '600', marginTop: 4 },
  waterProgress: { marginBottom: 12 },
  waterBar: {
    height: 20,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 6,
  },
  waterFill: {
    height: '100%',
    backgroundColor: COLORS.info,
    borderRadius: 10,
  },
  waterText: { fontSize: SIZES.sm, color: COLORS.textSecondary, textAlign: 'center' },
  waterButtons: { flexDirection: 'row', gap: 10 },
  waterBtn: {
    flex: 1,
    backgroundColor: COLORS.info,
    padding: 12,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  waterBtnText: { fontSize: SIZES.md, fontWeight: '700', color: '#fff' },
  waterBtnReset: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  waterBtnTextReset: { fontSize: SIZES.md, fontWeight: '600', color: COLORS.textSecondary },
  waterTip: { fontSize: SIZES.sm, color: COLORS.textSecondary, textAlign: 'center', marginTop: 10 },
  weightInputRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  logBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
  },
  logBtnText: { fontSize: SIZES.md, fontWeight: '700', color: '#fff' },
  logList: { marginTop: 12 },
  logEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logDate: { fontSize: SIZES.sm, color: COLORS.textSecondary },
  logWeight: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.text },
  sleepRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sleepLabel: { fontSize: SIZES.md, color: COLORS.text },
  sleepUnit: { fontSize: SIZES.sm, color: COLORS.textSecondary },
  sleepFeedback: { marginTop: 10, padding: 10, backgroundColor: COLORS.success + '15', borderRadius: SIZES.radius },
  sleepFeedbackText: { fontSize: SIZES.md, color: COLORS.success, fontWeight: '600', textAlign: 'center' },
  summaryCard: { backgroundColor: COLORS.primary + '08', borderWidth: 1, borderColor: COLORS.primary + '30' },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  summaryLabel: { fontSize: SIZES.md, color: COLORS.text },
  summaryValue: { fontSize: SIZES.md, fontWeight: '600', color: COLORS.text },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
    paddingTop: 20,
  },
  chartBar: { alignItems: 'center', flex: 1 },
  chartValue: { fontSize: 10, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  chartBarTrack: {
    width: 24,
    height: 80,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  chartBarFill: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  chartLabel: { fontSize: 10, color: COLORS.textSecondary, marginTop: 4 },
  chartSummary: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 10,
  },
});
