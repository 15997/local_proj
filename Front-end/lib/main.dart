import 'package:flutter/material.dart';
import 'core/app_theme.dart'; 
import 'screens/splash_screen.dart';
import 'screens/role_selection.dart';
import 'screens/home_screen.dart';
import 'screens/chatbot_screen.dart';

// PROVIDER SCREENS
import 'screens/provider_main_screen.dart';
import 'screens/provider_profile_screen.dart'; // Keep ONLY this one
import 'screens/settings_support_screen.dart'; 
import 'screens/provider_reviews_tab.dart';    

void main() {
  runApp(const AddisFinderApp());
}

class AddisFinderApp extends StatelessWidget {
  const AddisFinderApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Addis Local Service Finder',
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/role_selection': (context) => const RoleSelectionScreen(),
        '/home': (context) => const HomeScreen(),
        '/chatbot': (context) => const ChatbotScreen(),
        
        // FIX 1: Removed 'const' here
        '/provider_dashboard': (context) => ProviderMainScreen(),
        
        // FIX 2: Using the correct class from provider_profile_screen.dart
        '/profile_edit': (context) => const ProviderProfileScreen(),
        
        '/settings': (context) => const SettingsSupportScreen(),
        '/reviews': (context) => const ProviderReviewsTab(),
      },
    );
  }
}