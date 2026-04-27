import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Alert, Switch, TextInput,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../utils/theme';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = '@yogafit_profile';

const MENU_SECTIONS = [
  {
    titleEn: 'Account',
    titleHi: 'खाता',
    items: [
      { id: 'edit_profile', icon: '👤', en: 'Edit Profile', hi: 'प्रोफ़ाइल संपादित करें' },
      { id: 'goals', icon: '🎯', en: 'Health Goals', hi: 'स्वास्थ्य लक्ष्य' },
      { id: 'progress', icon: '📈', en: 'My Progress', hi: 'मेरी प्रगति' },
    ],
  },
  {
    titleEn: 'Preferences',
    titleHi: 'प्राथमिकताएं',
    items: [
      { id: 'language', icon: '🌐', en: 'Language', hi: 'भाषा' },
      { id: 'notifications', icon: '🔔', en: 'Notifications', hi: 'सूचनाएं' },
      { id: 'units', icon: '📏', en: 'Units (kg/lb)', hi: 'इकाइयां (kg/lb)' },
    ],
  },
  {
    titleEn: 'Support',
    titleHi: 'सहायता',
    items: [
      { id: 'help', icon: '❓', en: 'Help & FAQ', hi: 'सहायता और FAQ' },
      { id: 'feedback', icon: '💬', en: 'Send Feedback', hi: 'प्रतिक्रिया भेजें' },
      { id: 'share', icon: '📤', en: 'Share App', hi: 'ऐप शेयर करें' },
      { id: 'rate', icon: '⭐', en: 'Rate Us', hi: 'हमें रेट करें' },
    ],
  },
  {
    titleEn: 'About',
    titleHi: 'जानकारी',
    items: [
      { id: 'terms', icon: '📄', en: 'Terms of Service', hi: 'सेवा की शर्तें' },
      { id: 'privacy', icon: '🔒', en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
      { id: 'version', icon: 'ℹ️', en: 'Version 1.0.0', hi: 'संस्करण 1.0.0' },
    ],
  },
];

export default function ProfileScreen({ navigation }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const saved = await AsyncStorage.getItem(PROFILE_KEY);
      if (saved) setProfile(JSON.parse(saved));
    } catch (e) {
      console.log('Failed to load profile');
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      setIsEditing(false);
      Alert.alert('✅', isHindi ? 'प्रोफ़ाइल सेव हो गई!' : 'Profile saved!');
    } catch (e) {
      console.log('Failed to save profile');
    }
  };

  const handleMenuPress = (itemId) => {
    switch (itemId) {
      case 'edit_profile':
        setIsEditing(!isEditing);
        break;
      case 'language':
        Alert.alert(
          isHindi ? 'भाषा चुनें' : 'Choose Language',
          '',
          [
            { text: 'English', onPress: () => i18n.changeLanguage('en') },
            { text: 'हिंदी', onPress: () => i18n.changeLanguage('hi') },
            { text: isHindi ? 'रद्द करें' : 'Cancel', style: 'cancel' },
          ]
        );
        break;
      case 'notifications':
        setNotificationsEnabled(!notificationsEnabled);
        break;
      case 'goals':
        Alert.alert(
          isHindi ? '🎯 स्वास्थ्य लक्ष्य' : '🎯 Health Goals',
          isHindi
            ? 'जल्द ही उपलब्ध होगा'
            : 'Coming soon'
        );
        break;
      case 'share':
        Alert.alert(
          isHindi ? '📤 शेयर करें' : '📤 Share',
          isHindi
            ? 'YogaFit Pro - आपका पूर्ण स्वास्थ्य साथी!\n\nडाउनलोड करें: yogafitpro.com'
            : 'YogaFit Pro - Your complete health companion!\n\nDownload: yogafitpro.com'
        );
        break;
      case 'rate':
        Alert.alert(
          isHindi ? '⭐ रेटिंग' : '⭐ Rating',
          isHindi
            ? 'App Store / Play Store पर रेट करें'
            : 'Rate us on App Store / Play Store'
        );
        break;
      case 'help':
        Alert.alert(
          isHindi ? '❓ सहायता' : '❓ Help',
          isHindi
            ? 'ईमेल करें: support@yogafitpro.com'
            : 'Email us: support@yogafitpro.com'
        );
        break;
      case 'feedback':
        Alert.alert(
          isHindi ? '💬 प्रतिक्रिया' : '💬 Feedback',
          isHindi
            ? 'अपनी प्रतिक्रिया भेजें: feedback@yogafitpro.com'
            : 'Send feedback to: feedback@yogafitpro.com'
        );
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isHindi ? '👤 प्रोफ़ाइल' : '👤 Profile'}
          </Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>
              {profile.name ? profile.name[0].toUpperCase() : '🧘'}
            </Text>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <TextInput
                style={styles.editInput}
                value={profile.name}
                onChangeText={(v) => setProfile({ ...profile, name: v })}
                placeholder={isHindi ? 'आपका नाम' : 'Your name'}
                placeholderTextColor={COLORS.textLight}
              />
              <View style={styles.editRow}>
                <TextInput
                  style={[styles.editInput, { flex: 1, marginRight: 8 }]}
                  value={profile.age}
                  onChangeText={(v) => setProfile({ ...profile, age: v })}
                  placeholder={isHindi ? 'उम्र' : 'Age'}
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.textLight}
                />
                <TextInput
                  style={[styles.editInput, { flex: 1 }]}
                  value={profile.height}
                  onChangeText={(v) => setProfile({ ...profile, height: v })}
                  placeholder={isHindi ? 'ऊंचाई (cm)' : 'Height (cm)'}
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
              <View style={styles.editRow}>
                <TextInput
                  style={[styles.editInput, { flex: 1, marginRight: 8 }]}
                  value={profile.weight}
                  onChangeText={(v) => setProfile({ ...profile, weight: v })}
                  placeholder={isHindi ? 'वज़न (kg)' : 'Weight (kg)'}
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.textLight}
                />
                <TextInput
                  style={[styles.editInput, { flex: 1 }]}
                  value={profile.goal}
                  onChangeText={(v) => setProfile({ ...profile, goal: v })}
                  placeholder={isHindi ? 'लक्ष्य' : 'Goal'}
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
              <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
                <Text style={styles.saveBtnText}>
                  {isHindi ? '💾 सेव करें' : '💾 Save'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {profile.name || (isHindi ? 'नाम सेट करें' : 'Set your name')}
              </Text>
              {profile.age ? (
                <Text style={styles.profileDetail}>
                  {isHindi ? 'उम्र:' : 'Age:'} {profile.age} | {isHindi ? 'ऊंचाई:' : 'Height:'} {profile.height}cm | {isHindi ? 'वज़न:' : 'Weight:'} {profile.weight}kg
                </Text>
              ) : (
                <Text style={styles.profileHint}>
                  {isHindi ? 'प्रोफ़ाइल पूरी करने के लिए संपादित करें' : 'Tap edit to complete your profile'}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Premium Banner */}
        <TouchableOpacity
          style={styles.premiumBanner}
          onPress={() => navigation.navigate('Subscription')}
        >
          <View style={styles.premiumContent}>
            <Text style={styles.premiumEmoji}>⭐</Text>
            <View style={styles.premiumText}>
              <Text style={styles.premiumTitle}>
                {isHindi ? 'प्रीमियम में अपग्रेड करें' : 'Upgrade to Premium'}
              </Text>
              <Text style={styles.premiumDesc}>
                {isHindi ? 'सभी सुविधाएं अनलॉक करें' : 'Unlock all features'}
              </Text>
            </View>
          </View>
          <Text style={styles.premiumArrow}>›</Text>
        </TouchableOpacity>

        {/* Menu Sections */}
        {MENU_SECTIONS.map((section, sIndex) => (
          <View key={sIndex} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>
              {isHindi ? section.titleHi : section.titleEn}
            </Text>
            <View style={styles.menuCard}>
              {section.items.map((item, iIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    iIndex < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  onPress={() => handleMenuPress(item.id)}
                >
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text style={styles.menuLabel}>
                    {isHindi ? item.hi : item.en}
                  </Text>
                  {item.id === 'notifications' ? (
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                      trackColor={{ false: COLORS.border, true: COLORS.primary + '60' }}
                      thumbColor={notificationsEnabled ? COLORS.primary : COLORS.textLight}
                    />
                  ) : item.id === 'language' ? (
                    <Text style={styles.menuValue}>
                      {isHindi ? 'हिंदी' : 'English'}
                    </Text>
                  ) : (
                    <Text style={styles.menuArrow}>›</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            Alert.alert(
              isHindi ? 'लॉगआउट' : 'Logout',
              isHindi ? 'क्या आप लॉगआउट करना चाहते हैं?' : 'Are you sure you want to logout?',
              [
                { text: isHindi ? 'रद्द करें' : 'Cancel', style: 'cancel' },
                { text: isHindi ? 'लॉगआउट' : 'Logout', style: 'destructive' },
              ]
            );
          }}
        >
          <Text style={styles.logoutText}>
            {isHindi ? '🚪 लॉगआउट' : '🚪 Logout'}
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>YogaFit Pro v1.0.0</Text>
          <Text style={styles.footerText}>
            {isHindi ? 'भारत में ❤️ से बनाया' : 'Made with ❤️ in India'}
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
    paddingHorizontal: SIZES.padding,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: COLORS.surface,
    ...SHADOWS.small,
  },
  headerTitle: { fontSize: SIZES.xxl, fontWeight: '800', color: COLORS.text },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginTop: 16,
    padding: 16,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 28, fontWeight: '700', color: COLORS.primary },
  profileInfo: { flex: 1, marginLeft: 14 },
  profileName: { fontSize: SIZES.lg, fontWeight: '700', color: COLORS.text },
  profileDetail: { fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 4 },
  profileHint: { fontSize: SIZES.sm, color: COLORS.textLight, marginTop: 4 },
  editForm: { flex: 1, marginLeft: 14 },
  editInput: {
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    fontSize: SIZES.sm,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 8,
  },
  editRow: { flexDirection: 'row' },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  saveBtnText: { fontSize: SIZES.md, fontWeight: '700', color: '#fff' },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    marginHorizontal: SIZES.padding,
    marginTop: 16,
    padding: 16,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  premiumContent: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  premiumEmoji: { fontSize: 28, marginRight: 12 },
  premiumText: {},
  premiumTitle: { fontSize: SIZES.md, fontWeight: '700', color: COLORS.primary },
  premiumDesc: { fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  premiumArrow: { fontSize: 24, color: COLORS.primary, fontWeight: '300' },
  menuSection: {
    marginTop: 20,
    paddingHorizontal: SIZES.padding,
  },
  menuSectionTitle: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIcon: { fontSize: 18, marginRight: 14 },
  menuLabel: { flex: 1, fontSize: SIZES.md, color: COLORS.text },
  menuValue: { fontSize: SIZES.sm, color: COLORS.textSecondary, marginRight: 8 },
  menuArrow: { fontSize: 22, color: COLORS.textLight, fontWeight: '300' },
  logoutBtn: {
    marginHorizontal: SIZES.padding,
    marginTop: 24,
    paddingVertical: 14,
    backgroundColor: COLORS.error + '10',
    borderRadius: SIZES.radius,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.error + '30',
  },
  logoutText: { fontSize: SIZES.md, fontWeight: '600', color: COLORS.error },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: SIZES.xs,
    color: COLORS.textLight,
    marginBottom: 4,
  },
});
