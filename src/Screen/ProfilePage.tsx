// ProfilePage.tsx
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MenuItem = {
  id: string;
  label: string;
  icon: string;
  badge?: string;
};

const USER = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://i.pravatar.cc/300?img=12',
  memberSince: 'Jan 2023',
  stats: [
    { label: 'Orders', value: '24' },
    { label: 'Wishlist', value: '12' },
    { label: 'Reviews', value: '8' },
  ],
};

const MENU_ITEMS: MenuItem[] = [
  { id: '1', label: 'Edit Profile', icon: '✏️' },
  { id: '2', label: 'My Orders', icon: '📦', badge: '3' },
  { id: '3', label: 'Saved Addresses', icon: '📍' },
  { id: '4', label: 'Payment Methods', icon: '💳' },
  { id: '5', label: 'Notifications', icon: '🔔', badge: '2' },
  { id: '6', label: 'Help & Support', icon: '❓' },
  { id: '7', label: 'Privacy Policy', icon: '🔒' },
];

const ProfilePage = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 24 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header card */}
      <View style={styles.headerCard}>
        <Image source={{ uri: USER.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{USER.name}</Text>
        <Text style={styles.email}>{USER.email}</Text>
        <Text style={styles.phone}>{USER.phone}</Text>

        <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {USER.stats.map(stat => (
          <View key={stat.label} style={styles.statBox}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu */}
      <View style={styles.menuCard}>
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index !== MENU_ITEMS.length - 1 && styles.menuDivider,
            ]}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>

            {item.badge ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            ) : null}

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Member since {USER.memberSince}</Text>
    </ScrollView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  /* Header */
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E1E5EA',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1D1F',
  },
  email: {
    fontSize: 14,
    color: '#6C7278',
    marginTop: 4,
  },
  phone: {
    fontSize: 14,
    color: '#6C7278',
    marginTop: 2,
  },
  editButton: {
    marginTop: 16,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1D1F',
  },
  statLabel: {
    fontSize: 12,
    color: '#6C7278',
    marginTop: 4,
  },

  /* Menu */
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E1E5EA',
  },
  menuIcon: {
    fontSize: 18,
    width: 28,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#1A1D1F',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 22,
    color: '#B0B5BB',
    marginLeft: 8,
  },
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  /* Logout */
  logoutButton: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 15,
  },

  footer: {
    textAlign: 'center',
    color: '#9AA0A6',
    fontSize: 12,
    marginTop: 16,
  },
});
