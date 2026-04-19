import 'package:flutter/material.dart';
import '../core/app_theme.dart'; 
import 'login_screen.dart'; 
import 'signup_screen.dart'; // FIX: Ensure this import is here

class RoleSelectionScreen extends StatefulWidget {
  const RoleSelectionScreen({super.key});

  @override
  State<RoleSelectionScreen> createState() => _RoleSelectionScreenState();
}

class _RoleSelectionScreenState extends State<RoleSelectionScreen> {
  bool isClientSelected = true;

  @override
  Widget build(BuildContext context) {
    // Determine the role based on selection
    final selectedRole = isClientSelected ? UserRole.client : UserRole.provider;

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              "Join Addis Local Finder", 
              style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold)
            ),
            const SizedBox(height: 10),
            const Text(
              "Are you looking for a service or providing one?",
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey),
            ),
            const SizedBox(height: 40),
            
            // Role Selection Toggle Tabs
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppTheme.bgLightGrey, 
                borderRadius: BorderRadius.circular(15)
              ),
              child: Row(
                children: [
                  _roleTab("Client", isClientSelected, () => setState(() => isClientSelected = true)),
                  _roleTab("Provider", !isClientSelected, () => setState(() => isClientSelected = false)),
                ],
              ),
            ),
            
            const SizedBox(height: 50),
            
            // 1. CONTINUE / LOGIN BUTTON
            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => LoginScreen(role: selectedRole),
                    ),
                  );
                },
                child: const Text("Continue to Login", style: TextStyle(color: Colors.white, fontSize: 16)),
              ),
            ),

            const SizedBox(height: 15),

            // 2. SIGN UP BUTTON (The multi-step form we built)
            SizedBox(
              width: double.infinity,
              height: 55,
              child: OutlinedButton(
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: AppTheme.primaryTeal),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => SignupScreen(role: selectedRole),
                    ),
                  );
                },
                child: const Text("New here? Sign Up", style: TextStyle(color: AppTheme.primaryTeal, fontSize: 16)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _roleTab(String label, bool active, VoidCallback onTap) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(
            color: active ? AppTheme.primaryTeal : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            label, 
            textAlign: TextAlign.center, 
            style: TextStyle(
              color: active ? Colors.white : Colors.black54,
              fontWeight: active ? FontWeight.bold : FontWeight.normal,
            )
          ),
        ),
      ),
    );
  }
}