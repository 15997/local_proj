import 'package:flutter/material.dart';
import '../core/app_theme.dart'; 

class SplashScreen extends StatelessWidget {


  const SplashScreen({super.key}); // Standard constructor

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            const Spacer(),
            const CircleAvatar(
              radius: 60,
              backgroundColor: Color(0xFFE0F2F1),
              child: Icon(Icons.shield_outlined, size: 60, color: AppTheme.primaryTeal),
            ),
            const SizedBox(height: 30),
            const Text(
              "Find Verified Professionals",
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            const Spacer(),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: SizedBox(
                width: double.infinity,
                height: 55,
                child: ElevatedButton(
                  onPressed: () {
                    // Navigate to Role Selection where they will actually choose a role
                    Navigator.pushReplacementNamed(context, '/role_selection');
                  },
                  child: const Text("Get Started", style: TextStyle(color: Colors.white)),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}