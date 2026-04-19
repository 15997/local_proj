import 'package:flutter/material.dart';
import '../core/app_theme.dart'; 

class ProviderProfileScreen extends StatelessWidget {
  const ProviderProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("My Profile & Services"),
        actions: [
          TextButton(
            onPressed: () {},
            child: const Text("Save", 
              style: TextStyle(color: AppTheme.primaryTeal, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Profile Header Section
            Center(
              child: Column(
                children: [
                  Stack(
                    children: [
                      const CircleAvatar(
                        radius: 50,
                        backgroundImage: NetworkImage('https://via.placeholder.com/150'),
                      ),
                      Positioned(
                        bottom: 0,
                        right: 0,
                        child: CircleAvatar(
                          backgroundColor: AppTheme.primaryTeal,
                          radius: 18,
                          child: IconButton(
                            icon: const Icon(Icons.camera_alt, size: 18, color: Colors.white),
                            onPressed: () {},
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Text("Verified Expert", 
                    style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold, fontSize: 12)),
                ],
              ),
            ),

            const SizedBox(height: 30),

            // Bio / Description
            _buildSectionLabel("Service Description"),
            _buildTextField("Describe your expertise (e.g., Master Plumber with 10 years experience...)", maxLines: 3),

            const SizedBox(height: 20),

            // Pricing & Category
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildSectionLabel("Hourly Rate"),
                      _buildTextField("ETB 500"),
                    ],
                  ),
                ),
                const SizedBox(width: 15),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildSectionLabel("Primary Category"),
                      _buildTextField("Plumbing"),
                    ],
                  ),
                ),
              ],
            ),

            const SizedBox(height: 25),

            // Verification Documents
            _buildSectionLabel("Verification Documents"),
            const SizedBox(height: 10),
            _buildFileTile("Professional_License.pdf", true),
            _buildFileTile("National_ID_Scan.jpg", true),
            
            const SizedBox(height: 15),
            
            // Upload Button
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  side: const BorderSide(color: AppTheme.primaryTeal),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                ),
                onPressed: () {},
                icon: const Icon(Icons.upload_file, color: AppTheme.primaryTeal),
                label: const Text("Upload New Document", 
                  style: TextStyle(color: AppTheme.primaryTeal, fontWeight: FontWeight.bold)),
              ),
            ),

            const SizedBox(height: 40),

            // Danger Zone
            Center(
              child: TextButton(
                onPressed: () {},
                child: const Text("Deactivate Account", style: TextStyle(color: Colors.red)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionLabel(String label) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0, left: 4),
      child: Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
    );
  }

  Widget _buildTextField(String hint, {int maxLines = 1}) {
    return TextField(
      maxLines: maxLines,
      decoration: InputDecoration(
        hintText: hint,
        filled: true,
        fillColor: AppTheme.bgLightGrey,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        contentPadding: const EdgeInsets.all(16),
      ),
    );
  }

  Widget _buildFileTile(String fileName, bool isVerified) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        border: Border.all(color: AppTheme.bgLightGrey),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          const Icon(Icons.description_outlined, color: Colors.grey),
          const SizedBox(width: 10),
          Expanded(child: Text(fileName, style: const TextStyle(fontSize: 13))),
          if (isVerified) const Icon(Icons.check_circle, color: Colors.green, size: 18),
          const SizedBox(width: 10),
          const Icon(Icons.delete_outline, color: Colors.red, size: 18),
        ],
      ),
    );
  }
}