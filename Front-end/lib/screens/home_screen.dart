import 'package:flutter/material.dart';
import '../core/app_theme.dart'; 
import '../widgets/service_card.dart';


class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Addis Local Service Finder")),
      body: ListView(
        padding: const EdgeInsets.all(16),
       children: [
          const Text("Top Rated Near You", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 15),
          const ServiceCard(
            title: "Kebede Plumbing", 
            category: "Plumber", 
            rating: "4.9"
          ),
          const ServiceCard(
            title: "Almaz Electricals", 
            category: "Electrician", 
            rating: "4.7"
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppTheme.primaryTeal,
        onPressed: () => Navigator.pushNamed(context, '/chatbot'),
        child: const Icon(Icons.auto_awesome, color: Colors.white),
      ),
    );
  }
}