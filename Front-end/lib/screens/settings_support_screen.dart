import 'package:flutter/material.dart';
import '../core/app_theme.dart';

class SettingsSupportScreen extends StatefulWidget {
  const SettingsSupportScreen({super.key});

  @override
  State<SettingsSupportScreen> createState() => _SettingsSupportScreenState();
}

class _SettingsSupportScreenState extends State<SettingsSupportScreen> {
  bool _pushNotifications = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9F9F9), // Light background like the screenshot
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.black, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("Settings & Support", 
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // --- ACCOUNT SECTION ---
            _sectionHeader("ACCOUNT"),
            _settingsTile(
              icon: Icons.lock_outline,
              title: "Change Password",
              onTap: () {},
            ),

            const SizedBox(height: 25),

            // --- NOTIFICATIONS SECTION ---
            _sectionHeader("NOTIFICATIONS"),
            _settingsTile(
              icon: Icons.notifications_none_rounded,
              title: "Push Notifications",
              trailing: Switch(
                value: _pushNotifications,
                activeColor: AppTheme.primaryTeal,
                onChanged: (val) => setState(() => _pushNotifications = val),
              ),
            ),

            const SizedBox(height: 25),

            // --- SUPPORT SECTION ---
            _sectionHeader("SUPPORT"),
            _settingsTile(
              icon: Icons.help_outline_rounded,
              title: "FAQ",
              iconColor: Colors.orange,
              onTap: () {},
            ),
            _settingsTile(
              icon: Icons.headset_mic_outlined,
              title: "Contact Support",
              iconColor: Colors.orange,
              onTap: () {},
            ),

            const SizedBox(height: 25),

            // --- ABOUT SECTION ---
            _sectionHeader("ABOUT"),
            _settingsTile(
              icon: Icons.gavel_outlined,
              title: "Terms of Service",
              onTap: () {},
            ),
            _settingsTile(
              icon: Icons.shield_outlined,
              title: "Privacy Policy",
              onTap: () {},
            ),

            const SizedBox(height: 40),

            // --- LOGOUT BUTTON ---
            SizedBox(
              width: double.infinity,
              child: TextButton(
                onPressed: () => Navigator.pushReplacementNamed(context, '/login'),
                child: const Text("Log Out", 
                  style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 16)),
              ),
            ),

            const Center(
              child: Text("App Version 1.0.2", 
                style: TextStyle(color: Colors.grey, fontSize: 12)),
            ),
          ],
        ),
      ),
    );
  }

  // --- UI HELPERS ---

  Widget _sectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, bottom: 8),
      child: Text(title, 
        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.black54)),
    );
  }

  Widget _settingsTile({
    required IconData icon, 
    required String title, 
    VoidCallback? onTap, 
    Widget? trailing,
    Color iconColor = Colors.black87
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10, offset: const Offset(0, 4))
        ],
      ),
      child: ListTile(
        onTap: onTap,
        leading: Container(
          padding: const EdgeInsets.all(6),
          decoration: BoxDecoration(
            color: AppTheme.bgLightGrey,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: iconColor, size: 22),
        ),
        title: Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500)),
        trailing: trailing ?? const Icon(Icons.arrow_forward_ios, size: 14, color: Colors.grey),
      ),
    );
  }
}