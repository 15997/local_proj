import 'package:flutter/material.dart';
import 'provider_profile_screen.dart'; 

class ProviderProfileTab extends StatelessWidget {
  const ProviderProfileTab({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          const SizedBox(height: 40),
          // --- USER HEADER ---
          _buildHeader(),
          
          const SizedBox(height: 30),

          // --- SECTION 1: ACCOUNT ---
          _sectionHeader("Account Settings"),
          _profileMenuItem(
            icon: Icons.person_outline,
            title: "Manage Profile & Services",
            onTap: () {
              // This is the formal navigation command
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const ProviderProfileScreen(),
                ),
              );
            },
          ),
          _profileMenuItem(
            icon: Icons.verified_user_outlined,
            title: "Verification Status",
            onTap: () => _showVerificationStatus(context),
          ),

          // --- SECTION 2: APP PREFERENCES ---
          _sectionHeader("Preferences"),
          _profileMenuItem(
            icon: Icons.settings_outlined,
            title: "App Settings",
            onTap: () => _showSettingsBottomSheet(context),
          ),
          _profileMenuItem(
            icon: Icons.language,
            title: "Language",
            subtitle: "English",
            onTap: () => _showLanguageDialog(context),
          ),

          // --- SECTION 3: SUPPORT ---
          _sectionHeader("Support"),
          _profileMenuItem(
            icon: Icons.help_outline,
            title: "Help Center",
            onTap: () {},
          ),

          const SizedBox(height: 30),
          
          // --- LOGOUT ---
          _profileMenuItem(
            icon: Icons.logout,
            title: "Logout",
            color: Colors.redAccent,
            onTap: () => _showLogoutConfirmation(context),
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  // --- Formal UI Components ---

  Widget _buildHeader() {
    return Column(
      children: [
        const Stack(
          alignment: Alignment.bottomRight,
          children: [
            CircleAvatar(
              radius: 50, 
              backgroundColor: Colors.teal,
              child: Icon(Icons.person, size: 50, color: Colors.white),
            ),
            CircleAvatar(
              radius: 15,
              backgroundColor: Colors.white,
              child: Icon(Icons.camera_alt, size: 16, color: Colors.teal),
            ),
          ],
        ),
        const SizedBox(height: 12),
        const Text("Abebe Kebede", 
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
        const Text("Verified Professional • Addis Ababa", 
          style: TextStyle(color: Colors.teal, fontSize: 14, fontWeight: FontWeight.w500)),
      ],
    );
  }

  Widget _sectionHeader(String title) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      color: Colors.grey[100],
      child: Text(title.toUpperCase(), 
        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.blueGrey, letterSpacing: 1.2)),
    );
  }

  Widget _profileMenuItem({
    required IconData icon, 
    required String title, 
    String? subtitle,
    required VoidCallback onTap, 
    Color color = Colors.black87
  }) {
    return ListTile(
      onTap: onTap,
      leading: Icon(icon, color: color, size: 24),
      title: Text(title, 
        style: TextStyle(color: color, fontWeight: FontWeight.w500, fontSize: 15)),
      subtitle: subtitle != null ? Text(subtitle) : null,
      trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: Colors.grey),
    );
  }

  // --- Formal Front-End Functions ---

  void _showVerificationStatus(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Verification Status"),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.check_circle, color: Colors.green, size: 50),
            SizedBox(height: 10),
            Text("Your profile is fully verified. You can now appear in the RAG AI search results."),
          ],
        ),
        actions: [TextButton(onPressed: () => Navigator.pop(context), child: const Text("Dismiss"))],
      ),
    );
  }

  void _showSettingsBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (context) => Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text("Quick Settings", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            SwitchListTile(title: const Text("Enable Notifications"), value: true, onChanged: (v){}),
            SwitchListTile(title: const Text("Dark Mode"), value: false, onChanged: (v){}),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  void _showLanguageDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => SimpleDialog(
        title: const Text("Select Language"),
        children: [
          SimpleDialogOption(onPressed: () => Navigator.pop(context), child: const Text("English")),
          SimpleDialogOption(onPressed: () => Navigator.pop(context), child: const Text("Amharic (አማርኛ)")),
        ],
      ),
    );
  }

  void _showLogoutConfirmation(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Logout"),
        content: const Text("Are you sure you want to log out of Addis Local Service Finder?"),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Cancel")),
          TextButton(
            onPressed: () => Navigator.pushReplacementNamed(context, '/login'), 
            child: const Text("Logout", style: TextStyle(color: Colors.red))
          ),
        ],
      ),
    );
  }
}