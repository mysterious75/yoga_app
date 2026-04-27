import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, TextInput, Alert,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { DIET_PLANS } from '../data/dietPlans';
import { useTranslation } from 'react-i18next';

const PLAN_CARDS = [
  { id: 'weight_loss_veg', icon: '🥗', color: '#00B894' },
  { id: 'weight_loss_nonveg', icon: '🍗', color: '#E17055' },
  { id: 'muscle_gain', icon: '💪', color: '#6C5CE7' },
];

export default function DietScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [showCalc, setShowCalc] = useState(false);
  const [calcWeight, setCalcWeight] = useState('');
  const [calcHeight, setCalcHeight] = useState('');
  const [calcAge, setCalcAge] = useState('');
  const [calcGender, setCalcGender] = useState('male');
  const [calcActivity, setCalcActivity] = useState('moderate');
  const [calcResult, setCalcResult] = useState(null);

  const calculateCalories = () => {
    const w = parseFloat(calcWeight);
    const h = parseFloat(calcHeight);
    const a = parseFloat(calcAge);
    if (!w || !h || !a) {
      Alert.alert(isHindi ? 'त्रुटि' : 'Error', isHindi ? 'सभी फ़ील्ड भरें' : 'Fill all fields');
      return;
    }
    // Mifflin-St Jeor equation
    let bmr = calcGender === 'male'
      ? (10 * w) + (6.25 * h) - (5 * a) + 5
      : (10 * w) + (6.25 * h) - (5 * a) - 161;
    
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    const tdee = Math.round(bmr * (multipliers[calcActivity] || 1.55));
    const loseWeight = tdee - 500;
    const gainWeight = tdee + 300;
    setCalcResult({ tdee, loseWeight, gainWeight });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{isHindi ? '🍽️ आहार योजनाएं' : '🍽️ Diet Plans'}</Text>
          <Text style={styles.subtitle}>{isHindi ? 'प्रमाणित पोषण दिशानिर्देशों पर आधारित' : 'Based on certified nutrition guidelines'}</Text>
        </View>

        {/* Calorie Calculator */}
        <TouchableOpacity
          style={styles.calcCard}
          onPress={() => setShowCalc(!showCalc)}
        >
          <Text style={styles.calcIcon}>🔢</Text>
          <View style={styles.calcInfo}>
            <Text style={styles.calcTitle}>{isHindi ? 'कैलोरी कैलकुलेटर' : 'Calorie Calculator'}</Text>
            <Text style={styles.calcDesc}>{isHindi ? 'अपनी दैनिक कैलोरी ज़रूरत जानें' : 'Know your daily calorie needs'}</Text>
          </View>
          <Text style={styles.arrow}>{showCalc ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showCalc && (
          <View style={styles.calcForm}>
            <View style={styles.calcRow}>
              <View style={styles.calcField}>
                <Text style={styles.calcLabel}>{isHindi ? 'वज़न (kg)' : 'Weight (kg)'}</Text>
                <TextInput
                  style={styles.calcInput}
                  value={calcWeight}
                  onChangeText={setCalcWeight}
                  keyboardType="numeric"
                  placeholder="70"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
              <View style={styles.calcField}>
                <Text style={styles.calcLabel}>{isHindi ? 'ऊंचाई (cm)' : 'Height (cm)'}</Text>
                <TextInput
                  style={styles.calcInput}
                  value={calcHeight}
                  onChangeText={setCalcHeight}
                  keyboardType="numeric"
                  placeholder="170"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
            </View>
            <View style={styles.calcRow}>
              <View style={styles.calcField}>
                <Text style={styles.calcLabel}>{isHindi ? 'उम्र' : 'Age'}</Text>
                <TextInput
                  style={styles.calcInput}
                  value={calcAge}
                  onChangeText={setCalcAge}
                  keyboardType="numeric"
                  placeholder="25"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
              <View style={styles.calcField}>
                <Text style={styles.calcLabel}>{isHindi ? 'लिंग' : 'Gender'}</Text>
                <View style={styles.genderRow}>
                  <TouchableOpacity
                    style={[styles.genderBtn, calcGender === 'male' && styles.genderBtnActive]}
                    onPress={() => setCalcGender('male')}
                  >
                    <Text style={[styles.genderText, calcGender === 'male' && { color: '#fff' }]}>
                      {isHindi ? 'पुरुष' : 'Male'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.genderBtn, calcGender === 'female' && styles.genderBtnActive]}
                    onPress={() => setCalcGender('female')}
                  >
                    <Text style={[styles.genderText, calcGender === 'female' && { color: '#fff' }]}>
                      {isHindi ? 'महिला' : 'Female'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Activity Level */}
            <Text style={[styles.calcLabel, { marginBottom: 8, marginHorizontal: SIZES.padding }]}>
              {isHindi ? '🏃 गतिविधि स्तर' : '🏃 Activity Level'}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activityRow}>
              {[
                { id: 'sedentary', en: 'Sedentary', hi: 'कम', icon: '🪑' },
                { id: 'light', en: 'Light', hi: 'हल्का', icon: '🚶' },
                { id: 'moderate', en: 'Moderate', hi: 'मध्यम', icon: '🏃' },
                { id: 'active', en: 'Active', hi: 'सक्रिय', icon: '💪' },
                { id: 'very_active', en: 'Very Active',hi: 'बहुत सक्रिय', icon: '🔥' },
              ].map(level => (
                <TouchableOpacity
                  key={level.id}
                  style={[styles.activityChip, calcActivity === level.id && styles.activityChipActive]}
                  onPress={() => setCalcActivity(level.id)}
                >
                  <Text style={styles.activityIcon}>{level.icon}</Text>
                  <Text style={[styles.activityText, calcActivity === level.id && { color: '#fff' }]}>
                    {isHindi ? level.hi : level.en}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.calcSubmitBtn} onPress={calculateCalories}>
              <Text style={styles.calcSubmitText}>
                {isHindi ? '🔢 गणना करें' : '🔢 Calculate'}
              </Text>
            </TouchableOpacity>

            {calcResult && (
              <View style={styles.calcResult}>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>{isHindi ? '🔄 मेंटेनेंस' : '🔄 Maintenance'}</Text>
                  <Text style={styles.resultValue}>{calcResult.tdee} {isHindi ? 'कैलोरी' : 'cal'}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>{isHindi ? '📉 वज़न घटाएं' : '📉 Lose Weight'}</Text>
                  <Text style={[styles.resultValue, { color: COLORS.success }]}>{calcResult.loseWeight} {isHindi ? 'कैलोरी' : 'cal'}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>{isHindi ? '📈 वज़न बढ़ाएं' : '📈 Gain Weight'}</Text>
                  <Text style={[styles.resultValue, { color: COLORS.primary }]}>{calcResult.gainWeight} {isHindi ? 'कैलोरी' : 'cal'}</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Plan Cards */}
        {PLAN_CARDS.map(card => {
          const plan = DIET_PLANS[card.id];
          if (!plan) return null;
          return (
            <TouchableOpacity
              key={card.id}
              style={styles.planCard}
              onPress={() => navigation.navigate('DietPlanDetail', { planId: card.id })}
              activeOpacity={0.85}
            >
              <View style={[styles.planIconWrap, { backgroundColor: card.color + '15' }]}>
                <Text style={styles.planIcon}>{card.icon}</Text>
              </View>
              <View style={styles.planInfo}>
                <Text style={styles.planName}>{isHindi ? plan.nameHi : plan.name}</Text>
                <Text style={styles.planDesc}>{isHindi ? plan.descriptionHi : plan.description}</Text>
                <View style={styles.planMeta}>
                  <Text style={styles.planCalories}>🔥 {plan.calories} {isHindi ? 'कैलोरी/दिन' : 'cal/day'}</Text>
                  <Text style={styles.planDays}>📅 7 {isHindi ? 'दिन' : 'days'}</Text>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          );
        })}

        {/* Nutrition Tips */}
        <Text style={styles.sectionTitle}>{isHindi ? '💡 पोषण टिप्स' : '💡 Nutrition Tips'}</Text>
        {[
          { icon: '💧', en: 'Drink 3-4 liters of water daily', hi: 'रोज़ 3-4 लीटर पानी पिएं' },
          { icon: '🕐', en: 'Eat at regular intervals (every 3-4 hours)', hi: 'नियमित अंतराल पर खाएं (हर 3-4 घंटे)' },
          { icon: '🥗', en: 'Include salad in every meal', hi: 'हर भोजन में सलाद शामिल करें' },
          { icon: '🚫', en: 'Avoid processed and packaged food', hi: 'प्रोसेस्ड और पैकेज्ड फूड से बचें' },
          { icon: '🌙', en: 'Don\'t eat after 8 PM', hi: 'रात 8 बजे के बाद न खाएं' },
        ].map((tip, index) => (
          <View key={index} style={styles.tipRow}>
            <Text style={styles.tipIcon}>{tip.icon}</Text>
            <Text style={styles.tipText}>{isHindi ? tip.hi : tip.en}</Text>
          </View>
        ))}

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
  calcCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.info + '10',
    marginHorizontal: SIZES.padding,
    marginTop: 16,
    padding: 14,
    borderRadius: SIZES.radius,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  calcIcon: { fontSize: 28, marginRight: 12 },
  calcInfo: { flex: 1 },
  calcTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text },
  calcDesc: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  arrow: { fontSize: 14, color: COLORS.info, marginLeft: 8 },
  calcForm: {
    marginHorizontal: SIZES.padding,
    marginTop: 10,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    paddingVertical: 14,
    ...SHADOWS.small,
  },
  calcRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 12,
    marginBottom: 12,
  },
  calcField: { flex: 1 },
  calcLabel: { fontSize: SIZES.sm, color: COLORS.textSecondary, marginBottom: 6 },
  calcInput: {
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    fontSize: SIZES.md,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  genderRow: { flexDirection: 'row', gap: 8 },
  genderBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  genderBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderText: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.text },
  activityRow: {
    paddingHorizontal: SIZES.padding,
    gap: 8,
    marginBottom: 14,
  },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activityChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  activityIcon: { fontSize: 14, marginRight: 4 },
  activityText: { fontSize: SIZES.xs, fontWeight: '600', color: COLORS.text },
  calcSubmitBtn: {
    backgroundColor: COLORS.info,
    marginHorizontal: SIZES.padding,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  calcSubmitText: { fontSize: SIZES.md, fontWeight: '700', color: '#fff' },
  calcResult: {
    marginHorizontal: SIZES.padding,
    marginTop: 12,
    padding: 14,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: SIZES.radius,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  resultLabel: { fontSize: SIZES.md, color: COLORS.text },
  resultValue: { fontSize: SIZES.md, fontWeight: '700', color: COLORS.text },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginTop: 14,
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  planIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planIcon: { fontSize: 28 },
  planInfo: { flex: 1, marginLeft: 12 },
  planName: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text },
  planDesc: { fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  planMeta: { flexDirection: 'row', marginTop: 6, gap: 12 },
  planCalories: { fontSize: SIZES.xs, fontWeight: '600', color: COLORS.primary },
  planDays: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  arrow: { fontSize: 24, color: COLORS.textLight },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: SIZES.padding,
    marginTop: 24,
    marginBottom: 10,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginBottom: 10,
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: SIZES.radius,
  },
  tipIcon: { fontSize: 20, marginRight: 12 },
  tipText: { flex: 1, fontSize: SIZES.md, color: COLORS.text },
});
