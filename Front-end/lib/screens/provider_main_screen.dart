import 'package:flutter/material.dart';
import '../core/app_theme.dart';

// Import your sub-pages here
import 'provider_dashboard.dart';      // Tab 1
import 'provider_profile_screen.dart'; // Tab 2 (The Editor from Figure 4)
import 'provider_reviews_tab.dart';    // Tab 3 (Ratings & Reviews)
import 'provider_profile_tab.dart';    // Tab 5 (The Menu with Settings/Logout)

class ProviderMainScreen extends StatefulWidget {
  const ProviderMainScreen({super.key});

  @override
  State<ProviderMainScreen> createState() => _ProviderMainScreenState();
}

class _ProviderMainScreenState extends State<ProviderMainScreen> {
  int _selectedIndex = 0;

  // This list matches the icons in your Figure 4 screenshot
  final List<Widget> _pages = [
    const ProviderDashboard(),        // Index 0: Dashboard
    const ProviderProfileScreen(),    // Index 1: Services (The Editor)
    const ProviderReviewsTab(),       // Index 2: Reviews
    const Center(child: Text("Messages Screen", style: TextStyle(fontSize: 20))), // Index 3: Messages
    const ProviderProfileTab(),       // Index 4: Profile (The Menu)
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _selectedIndex,
        children: _pages,
      ),
      
      // BOTTOM NAVIGATION BAR (Matches your Figure 4)
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed, // Essential for 5 items
        selectedItemColor: AppTheme.primaryTeal,
        unselectedItemColor: Colors.grey,
        showUnselectedLabels: true,
        selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
        unselectedLabelStyle: const TextStyle(fontSize: 11),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_outlined),
            activeIcon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.construction_outlined),
            activeIcon: Icon(Icons.construction),
            label: 'Services',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.star_outline),
            activeIcon: Icon(Icons.star),
            label: 'Reviews',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.chat_bubble_outline),
            activeIcon: Icon(Icons.chat_bubble),
            label: 'Messages',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}