// Navigation.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilePage from '../Screen/ProfilePage';
import HomeScreen from '../Screen/HomeScreen';

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9AA0A6',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
