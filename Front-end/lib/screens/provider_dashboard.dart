import 'package:flutter/material.dart';
import '../core/app_theme.dart'; 

class ProviderDashboard extends StatelessWidget {
  const ProviderDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Dashboard"),
        centerTitle: true,
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.notifications_none, color: Colors.black),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Welcome, Provider!",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            
            // Availability Toggle Placeholder
            _buildStatusToggle(),
            
            const SizedBox(height: 25),
            
            // Statistics Grid
            const Text("Your Performance", 
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 15),
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              crossAxisSpacing: 15,
              mainAxisSpacing: 15,
              childAspectRatio: 1.4,
              children: [
                _buildStatCard("Total Reviews", "125", Icons.star, Colors.orange),
                _buildStatCard("Active Jobs", "3", Icons.work_outline, Colors.green),
                _buildStatCard("Profile Views", "82", Icons.visibility_outlined, Colors.blue),
                _buildStatCard("Earnings", "ETB 14k", Icons.payments_outlined, AppTheme.primaryTeal),
              ],
            ),
            
            const SizedBox(height: 30),
            
            // Recent Activity Section
            const Text("Recent Activity", 
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 15),
            _buildActivityTile(
              "New Job Request", 
              "Plumbing repair at Piassa", 
              "2m ago", 
              Icons.add_task
            ),
            _buildActivityTile(
              "Payment Received", 
              "ETB 500 from Hana L.", 
              "1h ago", 
              Icons.account_balance_wallet_outlined
            ),
            _buildActivityTile(
              "New Review", 
              "5 stars from Abebe K.", 
              "3h ago", 
              Icons.rate_review_outlined
            ),
          ],
        ),
      ),
      
    );
  }

  Widget _buildStatusToggle() {
    return Container(
      padding: const EdgeInsets.all(6),
      decoration: BoxDecoration(
        color: AppTheme.bgLightGrey,
        borderRadius: BorderRadius.circular(15),
      ),
      
    );
  }

  Widget _toggleButton(String label, bool active, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: active ? color : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: TextStyle(
            color: active ? Colors.white : Colors.black54,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: AppTheme.bgLightGrey,
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(height: 10),
          Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
        ],
      ),
    );
  }

  Widget _buildActivityTile(String title, String desc, String time, IconData icon) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        border: Border.all(color: AppTheme.bgLightGrey),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: AppTheme.primaryTeal.withOpacity(0.1),
            child: Icon(icon, color: AppTheme.primaryTeal, size: 20),
          ),
          const SizedBox(width: 15),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(desc, style: const TextStyle(fontSize: 12, color: Colors.grey)),
              ],
            ),
          ),
          Text(time, style: const TextStyle(fontSize: 10, color: Colors.grey)),
        ],
      ),
    );
  }

 
}