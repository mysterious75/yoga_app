import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const BODY_PARTS = [
  { id: 'back', icon: '◎', nameEn: 'Back Pain', nameHi: 'कमर दर्द', descEn: 'Lower & upper back relief', descHi: 'कमर और पीठ दर्द से राहत', color: '#FF6B6B', count: 8 },
  { id: 'knee', icon: '◎', nameEn: 'Knee Pain', nameHi: 'घुटने का दर्द', descEn: 'Strengthen & heal knees', descHi: 'घुटने मजबूत करें और ठीक करें', color: '#E9C46A', count: 6 },
  { id: 'neck', icon: '◎', nameEn: 'Neck Pain', nameHi: 'गर्दन का दर्द', descEn: 'Cervical & stiffness relief', descHi: 'सर्वाइकल और अकड़न से राहत', color: '#7B2CBF', count: 7 },
  { id: 'headache', icon: '◎', nameEn: 'Headache', nameHi: 'सिरदर्द', descEn: 'Migraine & tension relief', descHi: 'माइग्रेन और तनाव से राहत', color: '#4CC9F0', count: 5 },
  { id: 'shoulder', icon: '◎', nameEn: 'Shoulder Pain', nameHi: 'कंधे का दर्द', descEn: 'Frozen shoulder & stiffness', descHi: 'फ्रोजन शोल्डर और अकड़न', color: '#52B788', count: 6 },
  { id: 'digestion', icon: '◎', nameEn: 'Digestion', nameHi: 'पाचन', descEn: 'Gas, bloating & acidity', descHi: 'गैस, पेट फूलना और एसिडिटी', color: '#D4A373', count: 7 },
  { id: 'sciatica', icon: '◎', nameEn: 'Sciatica', nameHi: 'साइटिका', descEn: 'Nerve pain relief', descHi: 'नसों के दर्द से राहत', color: '#FD79A8', count: 5 },
  { id: 'hip', icon: '◎', nameEn: 'Hip Pain', nameHi: 'कूल्हे का दर्द', descEn: 'Hip flexibility & strength', descHi: 'कूल्हे की लचीलापन और मजबूती', color: '#A29BFE', count: 5 },
];

export default function PainGuideScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#3D0000', '#0A0A0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.title}>
                {isHindi ? '✚ दर्द गाइड' : '✚ Pain Guide'}
              </Text>
              <Text style={styles.subtitle}>
                {isHindi ? 'अपनी समस्या चुनें' : 'Select your problem area'}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Warning Banner */}
        <View style={styles.warningBanner}>
          <View style={styles.warningAccent} />
          <View style={styles.warningContent}>
            <Text style={styles.warningIcon}>⚠</Text>
            <Text style={styles.warningText}>
              {isHindi
                ? 'यह केवल मार्गदर्शन है। गंभीर दर्द में डॉक्टर से मिलें।'
                : 'This is guidance only. See a doctor for severe pain.'}
            </Text>
          </View>
        </View>

        {/* Body Parts Grid */}
        <View style={styles.grid}>
          {BODY_PARTS.map((part) => (
            <TouchableOpacity
              key={part.id}
              style={styles.card}
              onPress={() => navigation.navigate('PainDetail', { painArea: part })}
              activeOpacity={0.8}
            >
              <View style={[styles.cardAccent, { backgroundColor: part.color }]} />
              <View style={styles.cardContent}>
                <View style={[styles.iconCircle, { backgroundColor: part.color + '20' }]}>
                  <Text style={[styles.cardIcon, { color: part.color }]}>{part.icon}</Text>
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>
                    {isHindi ? part.nameHi : part.nameEn}
                  </Text>
                  <Text style={styles.cardDesc}>
                    {isHindi ? part.descHi : part.descEn}
                  </Text>
                </View>
                <View style={[styles.countBadge, { backgroundColor: part.color + '15' }]}>
                  <Text style={[styles.countText, { color: part.color }]}>
                    {part.count} {isHindi ? 'आसन' : 'poses'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* General Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>
            {isHindi ? '◈ सामान्य सुझाव' : '◈ General Tips'}
          </Text>
          <View style={styles.tipsDivider} />
          {[
            { en: 'Always warm up before exercises', hi: 'व्यायाम से पहले हमेशा वार्म अप करें' },
            { en: 'Never push through sharp pain', hi: 'तेज दर्द में कभी ज़बरदस्ती न करें' },
            { en: 'Practice on an empty stomach', hi: 'खाली पेट अभ्यास करें' },
            { en: 'Use a yoga mat for comfort', hi: 'आराम के लिए योग मैट का उपयोग करें' },
            { en: 'Consistency matters more than intensity', hi: 'निरंतरता, तीव्रता से ज़्यादा ज़रूरी है' },
          ].map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>
                {isHindi ? tip.hi : tip.en}
              </Text>
            </View>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            {isHindi
              ? '⚕ यह ऐप केवल सामान्य मार्गदर्शन प्रदान करता है। चिकित्सा सलाह के लिए डॉक्टर से मिलें।'
              : '⚕ This app provides general guidance only. Consult a doctor for medical advice.'}
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerGradient: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  backBtn: { padding: 8 },
  backText: { fontSize: 28, color: '#fff' },
  headerInfo: { flex: 1, marginLeft: 8 },
  title: { fontSize: SIZES.xxl, fontWeight: '800', color: '#fff' },
  subtitle: { fontSize: SIZES.sm, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  warningBanner: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    marginTop: 16,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.warning + '30',
    ...SHADOWS.card,
  },
  warningAccent: {
    width: 4,
    backgroundColor: COLORS.warning,
  },
  warningContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  warningIcon: { fontSize: 18, color: COLORS.warning, marginRight: 10 },
  warningText: { flex: 1, fontSize: SIZES.sm, color: COLORS.textSecondary, lineHeight: 20 },
  grid: {
    paddingHorizontal: SIZES.padding,
    marginTop: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    overflow: 'hidden',
    ...SHADOWS.card,
  },
  cardAccent: {
    height: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: { fontSize: 22 },
  cardText: { flex: 1, marginLeft: 14 },
  cardTitle: { fontSize: SIZES.base, fontWeight: '700', color: COLORS.text },
  cardDesc: { fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  countText: { fontSize: SIZES.xs, fontWeight: '600' },
  tipsSection: {
    marginHorizontal: SIZES.padding,
    marginTop: 24,
    backgroundColor: COLORS.surface,
    padding: 18,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.card,
  },
  tipsTitle: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
  },
  tipsDivider: {
    width: 24,
    height: 2,
    backgroundColor: COLORS.primaryGlow,
    borderRadius: 1,
    marginTop: 6,
    marginBottom: 12,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipBullet: { fontSize: 14, color: COLORS.primaryGlow, marginRight: 10, marginTop: 2 },
  tipText: { flex: 1, fontSize: SIZES.sm, color: COLORS.textSecondary, lineHeight: 20 },
  disclaimer: {
    marginHorizontal: SIZES.padding,
    marginTop: 20,
    padding: 14,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.warning + '20',
  },
  disclaimerText: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
