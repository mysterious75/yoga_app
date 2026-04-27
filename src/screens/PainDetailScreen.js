import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Linking,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';
import { YOGA_POSES } from '../data/yogaPoses';
import { FOOD_DATABASE } from '../data/foodDatabase';

// Pain-specific recommendations
const PAIN_DATA = {
  back: {
    redFlags: {
      en: [
        'Pain radiating down legs',
        'Numbness or tingling in legs',
        'Loss of bladder control',
        'Pain after injury/accident',
        'Pain lasting more than 4 weeks',
      ],
      hi: [
        'पैरों तक दर्द फैलना',
        'पैरों में सुन्नपन झनझनाहट',
        'मूत्राशय पर नियंत्रण खोना',
        'चोट/दुर्घटना के बाद दर्द',
        '4 हफ्ते से ज़्यादा दर्द',
      ],
    },
    poseIds: ['bhujangasana', 'marjaryasana', 'balasana', 'setu_bandhasana', 'adho_mukha', 'salabhasana', 'kati_chakrasana'],
    foodTags: ['anti_inflammatory', 'calcium', 'vitamin_d'],
    schedule: {
      en: [
        { time: '6:30 AM', task: 'Warm water + turmeric' },
        { time: '7:00 AM', task: 'Gentle back stretches (15 min)' },
        { time: '8:00 AM', task: 'Anti-inflammatory breakfast' },
        { time: '12:00 PM', task: 'Walk 10 min after lunch' },
        { time: '5:00 PM', task: 'Yoga session (20 min)' },
        { time: '9:00 PM', task: 'Warm compress on back' },
      ],
      hi: [
        { time: '6:30 AM', task: 'गर्म पानी + हल्दी' },
        { time: '7:00 AM', task: 'हल्की पीठ स्ट्रेचिंग (15 मिनट)' },
        { time: '8:00 AM', task: 'एंटी-इन्फ्लेमेटरी नाश्ता' },
        { time: '12:00 PM', task: 'खाने के बाद 10 मिनट चलें' },
        { time: '5:00 PM', task: 'योग सत्र (20 मिनट)' },
        { time: '9:00 PM', task: 'पीठ पर गर्म सेक' },
      ],
    },
  },
  knee: {
    redFlags: {
      en: [
        'Knee locking or giving way',
        'Visible swelling that won\'t go down',
        'Cannot bear weight at all',
        'Deformity after injury',
        'Fever with knee pain',
      ],
      hi: [
        'घुटना लॉक होना या मुड़ना',
        'सूजन जो कम न हो',
        'वज़न बिल्कुल न उठा पाना',
        'चोट के बाद विकृति',
        'बुखार के साथ घुटने में दर्द',
      ],
    },
    poseIds: ['virabhadrasana', 'vriksasana', 'utkatasana', 'malasana', 'supta_vajrasana'],
    foodTags: ['calcium', 'collagen', 'omega3'],
    schedule: {
      en: [
        { time: '6:30 AM', task: 'Gentle knee rotations' },
        { time: '7:00 AM', task: 'Low-impact yoga (15 min)' },
        { time: '8:00 AM', task: 'Calcium-rich breakfast' },
        { time: '2:00 PM', task: 'Cold pack if swollen (15 min)' },
        { time: '5:00 PM', task: 'Chair yoga session (15 min)' },
        { time: '9:00 PM', task: 'Warm oil massage on knees' },
      ],
      hi: [
        { time: '6:30 AM', task: 'हल्की घुटने की रोटेशन' },
        { time: '7:00 AM', task: 'कम प्रभाव वाला योग (15 मिनट)' },
        { time: '8:00 AM', task: 'कैल्शियम युक्त नाश्ता' },
        { time: '2:00 PM', task: 'सूजन हो तो ठंडा सेक (15 मिनट)' },
        { time: '5:00 PM', task: 'चेयर योग सत्र (15 मिनट)' },
        { time: '9:00 PM', task: 'घुटनों पर गर्म तेल मालिश' },
      ],
    },
  },
  neck: {
    redFlags: {
      en: [
        'Pain radiating to arms/hands',
        'Weakness in arms or hands',
        'Dizziness or fainting',
        'Neck stiffness with fever',
        'Cannot look down to chest',
      ],
      hi: [
        'हाथों/बाजुओं में दर्द फैलना',
        'हाथों में कमज़ोरी',
        'चक्कर आना या बेहोशी',
        'बुखार के साथ गर्दन अकड़ना',
        'छाती की तरफ देख न पाना',
      ],
    },
    poseIds: ['marjaryasana', 'balasana', 'setu_bandhasana', 'ardha_matsyendrasana', 'viparita_karani'],
    foodTags: ['anti_inflammatory', 'magnesium', 'omega3'],
    schedule: {
      en: [
        { time: '7:00 AM', task: 'Neck stretches (5 min)' },
        { time: '8:00 AM', task: 'Anti-inflammatory breakfast' },
        { time: '11:00 AM', task: 'Posture check + neck rolls' },
        { time: '2:00 PM', task: 'Gentle neck yoga (10 min)' },
        { time: '5:00 PM', task: 'Shoulder shrugs + stretches' },
        { time: '9:00 PM', task: 'Warm towel on neck (10 min)' },
      ],
      hi: [
        { time: '7:00 AM', task: 'गर्दन स्ट्रेचिंग (5 मिनट)' },
        { time: '8:00 AM', task: 'एंटी-इन्फ्लेमेटरी नाश्ता' },
        { time: '11:00 AM', task: 'पोस्चर चेक + गर्दन रोल' },
        { time: '2:00 PM', task: 'हल्की गर्दन योग (10 मिनट)' },
        { time: '5:00 PM', task: 'कंधे उठाना + स्ट्रेचिंग' },
        { time: '9:00 PM', task: 'गर्दन पर गर्म तौलिया (10 मिनट)' },
      ],
    },
  },
  headache: {
    redFlags: {
      en: [
        'Sudden worst headache of life',
        'Headache with fever and stiff neck',
        'Vision changes or confusion',
        'Headache after head injury',
        'Headache with seizures',
      ],
      hi: [
        'अचानक ज़िंदगी का सबसे बुरा सिरदर्द',
        'बुखार और गर्दन अकड़न के साथ सिरदर्द',
        'देखने में बदलाव या भ्रम',
        'सिर की चोट के बाद सिरदर्द',
        'दौरे के साथ सिरदर्द',
      ],
    },
    poseIds: ['balasana', 'viparita_karani', 'savasana', 'padmasana', 'uttanasana'],
    foodTags: ['magnesium', 'hydration', 'vitamin_b'],
    schedule: {
      en: [
        { time: '6:30 AM', task: 'Drink 2 glasses of water' },
        { time: '7:00 AM', task: 'Pranayama + meditation (15 min)' },
        { time: '8:00 AM', task: 'Magnesium-rich breakfast' },
        { time: '12:00 PM', task: 'Eye rest + neck stretches' },
        { time: '4:00 PM', task: 'Gentle yoga (15 min)' },
        { time: '9:00 PM', task: 'Lavender oil on temples' },
      ],
      hi: [
        { time: '6:30 AM', task: '2 गिलास पानी पिएं' },
        { time: '7:00 AM', task: 'प्राणायाम + ध्यान (15 मिनट)' },
        { time: '8:00 AM', task: 'मैग्नीशियम युक्त नाश्ता' },
        { time: '12:00 PM', task: 'आंखों को आराम + गर्दन स्ट्रेच' },
        { time: '4:00 PM', task: 'हल्का योग (15 मिनट)' },
        { time: '9:00 PM', task: 'कनपटी पर लैवेंडर तेल' },
      ],
    },
  },
  shoulder: {
    redFlags: {
      en: [
        'Cannot raise arm at all',
        'Severe pain at night',
        'Shoulder appears deformed',
        'Numbness down the arm',
        'Pain after a fall',
      ],
      hi: [
        'हाथ बिल्कुल न उठा पाना',
        'रात को तेज दर्द',
        'कंधा विकृत दिखना',
        'बाजू में सुन्नपन',
        'गिरने के बाद दर्द',
      ],
    },
    poseIds: ['adho_mukha', 'garudasana', 'gomukhasana', 'urdhva_mukha', 'paschimottanasana'],
    foodTags: ['anti_inflammatory', 'protein', 'omega3'],
    schedule: {
      en: [
        { time: '7:00 AM', task: 'Pendulum swings (5 min)' },
        { time: '7:30 AM', task: 'Shoulder stretches (10 min)' },
        { time: '8:00 AM', task: 'Protein-rich breakfast' },
        { time: '12:00 PM', task: 'Wall slides exercise' },
        { time: '5:00 PM', task: 'Yoga for shoulders (20 min)' },
        { time: '9:00 PM', task: 'Warm compress on shoulder' },
      ],
      hi: [
        { time: '7:00 AM', task: 'पेंडुलम स्विंग (5 मिनट)' },
        { time: '7:30 AM', task: 'कंधे की स्ट्रेचिंग (10 मिनट)' },
        { time: '8:00 AM', task: 'प्रोटीन युक्त नाश्ता' },
        { time: '12:00 PM', task: 'वॉल स्लाइड व्यायाम' },
        { time: '5:00 PM', task: 'कंधे के लिए योग (20 मिनट)' },
        { time: '9:00 PM', task: 'कंधे पर गर्म सेक' },
      ],
    },
  },
  digestion: {
    redFlags: {
      en: [
        'Blood in stool',
        'Unexplained weight loss',
        'Severe abdominal pain',
        'Persistent vomiting',
        'Difficulty swallowing',
      ],
      hi: [
        'मल में खून',
        'बिना कारण वज़न घटना',
        'पेट में तेज दर्द',
        'लगातार उल्टी',
        'निगलने में कठिनाई',
      ],
    },
    poseIds: ['pawanmuktasana', 'balasana', 'ardha_matsyendrasana', 'marjaryasana', 'savasana'],
    foodTags: ['fiber', 'probiotic', 'digestive'],
    schedule: {
      en: [
        { time: '6:00 AM', task: 'Warm lemon water' },
        { time: '6:30 AM', task: 'Pawanmuktasana (wind-relieving)' },
        { time: '8:00 AM', task: 'Fiber-rich breakfast' },
        { time: '12:00 PM', task: 'Walk 15 min after lunch' },
        { time: '5:00 PM', task: 'Twisting yoga poses (15 min)' },
        { time: '9:00 PM', task: 'Ajwain water or herbal tea' },
      ],
      hi: [
        { time: '6:00 AM', task: 'गर्म नींबू पानी' },
        { time: '6:30 AM', task: 'पवनमुक्तासन (वायु निवारक)' },
        { time: '8:00 AM', task: 'फाइबर युक्त नाश्ता' },
        { time: '12:00 PM', task: 'खाने के बाद 15 मिनट चलें' },
        { time: '5:00 PM', task: 'ट्विस्टिंग योग (15 मिनट)' },
        { time: '9:00 PM', task: 'अजवाइन पानी या हर्बल चाय' },
      ],
    },
  },
  sciatica: {
    redFlags: {
      en: [
        'Loss of bladder/bowel control',
        'Progressive leg weakness',
        'Numbness in groin area',
        'Pain not improving after 6 weeks',
        'Pain after serious injury',
      ],
      hi: [
        'मूत्र/मल पर नियंत्रण खोना',
        'पैर में बढ़ती कमज़ोरी',
        'जांघ के पास सुन्नपन',
        '6 हफ्ते बाद भी दर्द में सुधार नहीं',
        'गंभीर चोट के बाद दर्द',
      ],
    },
    poseIds: ['adho_mukha', 'balasana', 'ardha_matsyendrasana', 'setu_bandhasana', 'savasana'],
    foodTags: ['anti_inflammatory', 'omega3', 'vitamin_b'],
    schedule: {
      en: [
        { time: '7:00 AM', task: 'Gentle hamstring stretches' },
        { time: '7:30 AM', task: 'Sciatica-specific yoga (15 min)' },
        { time: '8:00 AM', task: 'Anti-inflammatory breakfast' },
        { time: '2:00 PM', task: 'Walk 10 min (flat surface)' },
        { time: '5:00 PM', task: 'Nerve gliding exercises' },
        { time: '9:00 PM', task: 'Warm Epsom salt bath' },
      ],
      hi: [
        { time: '7:00 AM', task: 'हल्की हैमस्ट्रिंग स्ट्रेचिंग' },
        { time: '7:30 AM', task: 'साइटिका योग (15 मिनट)' },
        { time: '8:00 AM', task: 'एंटी-इन्फ्लेमेटरी नाश्ता' },
        { time: '2:00 PM', task: '10 मिनट चलें (समतल)' },
        { time: '5:00 PM', task: 'नर्व ग्लाइडिंग व्यायाम' },
        { time: '9:00 PM', task: 'गर्म एप्सम नमक स्नान' },
      ],
    },
  },
  hip: {
    redFlags: {
      en: [
        'Cannot bear weight on hip',
        'Hip appears shorter/turned',
        'Severe pain after fall',
        'Fever with hip pain',
        'Groin pain with movement',
      ],
      hi: [
        'कूल्हे पर वज़न न डाल पाना',
        'कूल्हा छोटा/घूमा हुआ दिखना',
        'गिरने के बाद तेज दर्द',
        'बुखार के साथ कूल्हे में दर्द',
        'हिलने पर जांघ में दर्द',
      ],
    },
    poseIds: ['virabhadrasana', 'malasana', 'anjaneyasana', 'gomukhasana', 'supta_vajrasana'],
    foodTags: ['calcium', 'anti_inflammatory', 'protein'],
    schedule: {
      en: [
        { time: '7:00 AM', task: 'Hip circles (5 min)' },
        { time: '7:30 AM', task: 'Hip-opening yoga (15 min)' },
        { time: '8:00 AM', task: 'Calcium-rich breakfast' },
        { time: '12:00 PM', task: 'Walking lunges (gentle)' },
        { time: '5:00 PM', task: 'Deep hip stretches (15 min)' },
        { time: '9:00 PM', task: 'Warm oil hip massage' },
      ],
      hi: [
        { time: '7:00 AM', task: 'कूल्हे के सर्कल (5 मिनट)' },
        { time: '7:30 AM', task: 'कूल्हा खोलने वाला योग (15 मिनट)' },
        { time: '8:00 AM', task: 'कैल्शियम युक्त नाश्ता' },
        { time: '12:00 PM', task: 'लंज चलना (हल्का)' },
        { time: '5:00 PM', task: 'गहरी कूल्हे स्ट्रेच (15 मिनट)' },
        { time: '9:00 PM', task: 'कूल्हे पर गर्म तेल मालिश' },
      ],
    },
  },
};

export default function PainDetailScreen({ route, navigation }) {
  const { painArea } = route.params;
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [activeTab, setActiveTab] = useState('yoga');

  const data = PAIN_DATA[painArea.id] || PAIN_DATA.back;

  // Get recommended poses from yoga database
  const recommendedPoses = YOGA_POSES.filter(pose =>
    data.poseIds.includes(pose.id)
  ).slice(0, 6);

  // Get recommended foods
  const recommendedFoods = FOOD_DATABASE.filter(food =>
    food.tags && food.tags.some(tag => data.foodTags.includes(tag))
  ).slice(0, 8);

  const schedule = isHindi ? data.schedule.hi : data.schedule.en;
  const redFlags = isHindi ? data.redFlags.hi : data.redFlags.en;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: painArea.color }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>
            {painArea.icon} {isHindi ? painArea.nameHi : painArea.nameEn}
          </Text>
          <Text style={styles.headerSubtitle}>
            {isHindi ? painArea.descHi : painArea.descEn}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Red Flags Warning */}
        <View style={styles.redFlagCard}>
          <Text style={styles.redFlagTitle}>
            {isHindi ? '⚠️ डॉक्टर के पास जाएं अगर:' : '⚠️ See a Doctor If:'}
          </Text>
          {redFlags.map((flag, index) => (
            <View key={index} style={styles.redFlagRow}>
              <Text style={styles.redFlagBullet}>🚨</Text>
              <Text style={styles.redFlagText}>{flag}</Text>
            </View>
          ))}
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabRow}>
          {[
            { id: 'yoga', icon: '🧘', en: 'Yoga', hi: 'योग' },
            { id: 'food', icon: '🍎', en: 'Foods', hi: 'भोजन' },
            { id: 'schedule', icon: '📅', en: 'Schedule', hi: 'समय-सारणी' },
          ].map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabBtn, activeTab === tab.id && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                {tab.icon} {isHindi ? tab.hi : tab.en}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Yoga Tab */}
        {activeTab === 'yoga' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabContentTitle}>
              {isHindi ? '🧘 अनुशंसित योग आसन' : '🧘 Recommended Yoga Poses'}
            </Text>
            {recommendedPoses.length > 0 ? (
              recommendedPoses.map((pose) => (
                <TouchableOpacity
                  key={pose.id}
                  style={styles.poseCard}
                  onPress={() => navigation.navigate('YogaDetail', { pose })}
                >
                  <View style={[styles.poseIconBg, { backgroundColor: painArea.color + '15' }]}>
                    <Text style={styles.poseIcon}>🧘</Text>
                  </View>
                  <View style={styles.poseInfo}>
                    <Text style={styles.poseName}>
                      {isHindi ? pose.nameHi : pose.name}
                    </Text>
                    <Text style={styles.poseSanskrit}>{pose.sanskrit}</Text>
                    <View style={styles.poseMeta}>
                      <Text style={styles.poseMetaText}>⏱️ {pose.duration}</Text>
                      <Text style={styles.poseMetaText}>🔥 {pose.caloriesPerMin}/min</Text>
                    </View>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>
                {isHindi ? 'जल्द ही जोड़ा जाएगा' : 'Coming soon'}
              </Text>
            )}
          </View>
        )}

        {/* Food Tab */}
        {activeTab === 'food' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabContentTitle}>
              {isHindi ? '🍎 अनुशंसित भोजन' : '🍎 Recommended Foods'}
            </Text>
            {recommendedFoods.length > 0 ? (
              recommendedFoods.map((food) => (
                <TouchableOpacity
                  key={food.id}
                  style={styles.foodCard}
                  onPress={() => navigation.navigate('FoodDetail', { food })}
                >
                  <Text style={styles.foodIcon}>{food.icon || '🍽️'}</Text>
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>
                      {isHindi ? food.nameHi : food.name}
                    </Text>
                    <Text style={styles.foodCal}>
                      {food.calories} {isHindi ? 'कैलोरी' : 'cal'} / {isHindi ? '100ग्रा' : '100g'}
                    </Text>
                  </View>
                  <View style={styles.foodNutrients}>
                    <Text style={styles.nutrientText}>P: {food.protein}g</Text>
                    <Text style={styles.nutrientText}>C: {food.carbs}g</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>
                {isHindi ? 'जल्द ही जोड़ा जाएगा' : 'Coming soon'}
              </Text>
            )}
          </View>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabContentTitle}>
              {isHindi ? '📅 दैनिक समय-सारणी' : '📅 Daily Schedule'}
            </Text>
            {schedule.map((item, index) => (
              <View key={index} style={styles.scheduleRow}>
                <View style={styles.timeColumn}>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <View style={styles.timelineDot} />
                <View style={styles.taskColumn}>
                  <Text style={styles.taskText}>{item.task}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

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
    paddingVertical: 16,
  },
  backBtn: { padding: 8 },
  backText: { fontSize: 28, color: '#fff' },
  headerInfo: { flex: 1, marginLeft: 8 },
  headerTitle: { fontSize: SIZES.xl, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: SIZES.sm, color: '#ffffffcc', marginTop: 2 },
  redFlagCard: {
    backgroundColor: COLORS.error + '10',
    marginHorizontal: SIZES.padding,
    marginTop: 16,
    padding: 16,
    borderRadius: SIZES.radius,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  redFlagTitle: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.error,
    marginBottom: 10,
  },
  redFlagRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  redFlagBullet: { fontSize: 14, marginRight: 8, marginTop: 2 },
  redFlagText: { flex: 1, fontSize: SIZES.sm, color: COLORS.text, lineHeight: 20 },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 8,
    marginTop: 16,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.text },
  tabTextActive: { color: '#fff' },
  tabContent: {
    marginTop: 12,
    paddingHorizontal: SIZES.padding,
  },
  tabContentTitle: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  poseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: SIZES.radius,
    marginBottom: 10,
    ...SHADOWS.small,
  },
  poseIconBg: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poseIcon: { fontSize: 22 },
  poseInfo: { flex: 1, marginLeft: 12 },
  poseName: { fontSize: SIZES.md, fontWeight: '700', color: COLORS.text },
  poseSanskrit: { fontSize: SIZES.xs, color: COLORS.textSecondary, fontStyle: 'italic', marginTop: 1 },
  poseMeta: { flexDirection: 'row', gap: 12, marginTop: 4 },
  poseMetaText: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  arrow: { fontSize: 24, color: COLORS.textLight, fontWeight: '300' },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: SIZES.radius,
    marginBottom: 10,
    ...SHADOWS.small,
  },
  foodIcon: { fontSize: 28 },
  foodInfo: { flex: 1, marginLeft: 12 },
  foodName: { fontSize: SIZES.md, fontWeight: '600', color: COLORS.text },
  foodCal: { fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  foodNutrients: { alignItems: 'flex-end' },
  nutrientText: { fontSize: SIZES.xs, color: COLORS.textSecondary },
  emptyText: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 30,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  timeColumn: {
    width: 70,
    paddingVertical: 12,
    paddingRight: 12,
    alignItems: 'flex-end',
  },
  timeText: { fontSize: SIZES.sm, fontWeight: '600', color: COLORS.primary },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginTop: 16,
    marginHorizontal: 12,
  },
  taskColumn: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: SIZES.radius,
    marginBottom: 8,
    ...SHADOWS.small,
  },
  taskText: { fontSize: SIZES.md, color: COLORS.text },
});
