import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Dimensions,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const BODY_PARTS = [
  {
    id: 'back',
    icon: '🔙',
    nameEn: 'Back Pain',
    nameHi: 'कमर दर्द',
    descEn: 'Lower & upper back relief',
    descHi: 'कमर और पीठ दर्द से राहत',
    color: '#E74C3C',
    count: 8,
  },
  {
    id: 'knee',
    icon: '🦵',
    nameEn: 'Knee Pain',
    nameHi: 'घुटने का दर्द',
    descEn: 'Strengthen & heal knees',
    descHi: 'घुटने मजबूत करें और ठीक करें',
    color: '#F39C12',
    count: 6,
  },
  {
    id: 'neck',
    icon: '🦒',
    nameEn: 'Neck Pain',
    nameHi: 'गर्दन का दर्द',
    descEn: 'Cervical & stiffness relief',
    descHi: 'सर्वाइकल और अकड़न से राहत',
    color: '#9B59B6',
    count: 7,
  },
  {
    id: 'headache',
    icon: '🤕',
    nameEn: 'Headache',
    nameHi: 'सिरदर्द',
    descEn: 'Migraine & tension relief',
    descHi: 'माइग्रेन और तनाव से राहत',
    color: '#3498DB',
    count: 5,
  },
  {
    id: 'shoulder',
    icon: '💪',
    nameEn: 'Shoulder Pain',
    nameHi: 'कंधे का दर्द',
    descEn: 'Frozen shoulder & stiffness',
    descHi: 'फ्रोजन शोल्डर और अकड़न',
    color: '#00B894',
    count: 6,
  },
  {
    id: 'digestion',
    icon: '🫄',
    nameEn: 'Digestion',
    nameHi: 'पाचन',
    descEn: 'Gas, bloating & acidity',
    descHi: 'गैस, पेट फूलना और एसिडिटी',
    color: '#55EFC4',
    count: 7,
  },
  {
    id: 'sciatica',
    icon: '🦴',
    nameEn: 'Sciatica',
    nameHi: 'साइटिका',
    descEn: 'Nerve pain relief',
    descHi: 'नसों के दर्द से राहत',
    color: '#FD79A8',
    count: 5,
  },
  {
    id: 'hip',
    icon: '🦿',
    nameEn: 'Hip Pain',
    nameHi: 'कूल्हे का दर्द',
    descEn: 'Hip flexibility & strength',
    descHi: 'कूल्हे की लचीलापन और मजबूती',
    color: '#A29BFE',
    count: 5,
  },
];

export default function PainGuideScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.title}>
              {isHindi ? '🩺 दर्द गाइड' : '🩺 Pain Guide'}
            </Text>
            <Text style={styles.subtitle}>
              {isHindi ? 'अपनी समस्या चुनें' : 'Select your problem area'}
            </Text>
          </View>
        </View>

        {/* Warning Banner */}
        <View style={styles.warningBanner}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.warningText}>
            {isHindi
              ? 'यह केवल मार्गदर्शन है। गंभीर दर्द में डॉक्टर से मिलें।'
              : 'This is guidance only. See a doctor for severe pain.'}
          </Text>
        </View>

        {/* Body Parts Grid */}
        <View style={styles.grid}>
          {BODY_PARTS.map((part) => (
            <TouchableOpacity
              key={part.id}
              style={[styles.card, { borderLeftColor: part.color }]}
              onPress={() => navigation.navigate('PainDetail', { painArea: part })}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: part.color + '15' }]}>
                <Text style={styles.cardIcon}>{part.icon}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  {isHindi ? part.nameHi : part.nameEn}
                </Text>
                <Text style={styles.cardDesc}>
                  {isHindi ? part.descHi : part.descEn}
                </Text>
              </View>
              <View style={[styles.countBadge, { backgroundColor: part.color + '20' }]}>
                <Text style={[styles.countText, { color: part.color }]}>
                  {part.count} {isHindi ? 'आसन' : 'poses'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* General Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>
            {isHindi ? '💡 सामान्य सुझाव' : '💡 General Tips'}
          </Text>
          {[
            {
              en: 'Always warm up before exercises',
              hi: 'व्यायाम से पहले हमेशा वार्म अप करें',
            },
            {
              en: 'Never push through sharp pain',
              hi: 'तेज दर्द में कभी ज़बरदस्ती न करें',
            },
            {
              en: 'Practice on an empty stomach',
              hi: 'खाली पेट अभ्यास करें',
            },
            {
              en: 'Use a yoga mat for comfort',
              hi: 'आराम के लिए योग मैट का उपयोग करें',
            },
            {
              en: 'Consistency matters more than intensity',
              hi: 'निरंतरता, तीव्रता से ज़्यादा ज़रूरी है',
            },
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
              ? '⚕️ यह ऐप केवल सामान्य मार्गदर्शन प्रदान करता है। चिकित्सा सलाह के लिए डॉक्टर से मिलें।'
              : '⚕️ This app provides general guidance only. Consult a doctor for medical advice.'}
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: COLORS.surface,
    ...SHADOWS.small,
  },
  backBtn: { padding: 8 },
  backText: { fontSize: 28, color: COLORS.text },
  headerInfo: { flex: 1, marginLeft: 8 },
  title: { fontSize: SIZES.xxl, fontWeight: '800', color: COLORS.text },
  subtitle: { fontSize: SIZES.sm, color: COLORS.textSecondary, marginTop: 2 },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warning + '15',
    marginHorizontal: SIZES.padding,
    marginTop: 16,
    padding: 14,
    borderRadius: SIZES.radius,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  warningIcon: { fontSize: 20, marginRight: 10 },
  warningText: { flex: 1, fontSize: SIZES.sm, color: COLORS.textSecondary, lineHeight: 20 },
  grid: {
    paddingHorizontal: SIZES.padding,
    marginTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 12,
    borderLeftWidth: 4,
    ...SHADOWS.small,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: { fontSize: 24 },
  cardContent: { flex: 1, marginLeft: 14 },
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
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  tipsTitle: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipBullet: { fontSize: 14, color: COLORS.primary, marginRight: 10, marginTop: 2 },
  tipText: { flex: 1, fontSize: SIZES.sm, color: COLORS.textSecondary, lineHeight: 20 },
  disclaimer: {
    marginHorizontal: SIZES.padding,
    marginTop: 20,
    padding: 12,
    backgroundColor: COLORS.warning + '10',
    borderRadius: SIZES.radius,
  },
  disclaimerText: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
