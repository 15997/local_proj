import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../core/app_theme.dart';
import 'signup_screen.dart';

class LoginScreen extends StatefulWidget {
  final UserRole role;
  const LoginScreen({super.key, required this.role});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isPasswordVisible = false;
  bool _isLoading = false; // Mock loading state

  // Frontend Validator: Checks the 09/07 Addis format
  String? get _phoneError {
    final text = _phoneController.text;
    if (text.isEmpty) return null;
    if (text.length < 10) return "Phone must be 10 digits";
    if (!text.startsWith('09') && !text.startsWith('07')) return "Must start with 09 or 07";
    return null;
  }

  // Mock Login Process
  Future<void> _handleLogin() async {
    if (_phoneError == null && _phoneController.text.length == 10 && _passwordController.text.length >= 6) {
      setState(() => _isLoading = true);
      
      // Simulate a network "handshake" delay
      await Future.delayed(const Duration(seconds: 2));
      
      setState(() => _isLoading = false);
      
      // Navigate based on role
      bool isProvider = widget.role == UserRole.provider;
      Navigator.pushReplacementNamed(context, isProvider ? '/provider_dashboard' : '/home');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Please check your phone number and password")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    bool isProvider = widget.role == UserRole.provider;

    return Scaffold(
      appBar: AppBar(backgroundColor: Colors.transparent, elevation: 0),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              isProvider ? "Provider Login" : "Client Login",
              style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Text("Welcome back! Login to your account.", style: TextStyle(color: Colors.grey[600])),
            const SizedBox(height: 40),

            // PHONE FIELD WITH LIVE VALIDATION
            const Text("Phone Number", style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            TextField(
              controller: _phoneController,
              onChanged: (val) => setState(() {}), // Refresh UI to show/hide error
              keyboardType: TextInputType.phone,
              maxLength: 10,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              decoration: InputDecoration(
                counterText: "",
                hintText: "09...or 07...",
                errorText: _phoneError, // Shows red text below field if invalid
                prefixIcon: const Icon(Icons.phone_android, size: 20),
                filled: true,
                fillColor: AppTheme.bgLightGrey,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
              ),
            ),

            const SizedBox(height: 20),

            // PASSWORD FIELD
            const Text("Password", style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            TextField(
              controller: _passwordController,
              obscureText: !_isPasswordVisible,
              decoration: InputDecoration(
                hintText: "********",
                prefixIcon: const Icon(Icons.lock_outline, size: 20),
                suffixIcon: IconButton(
                  icon: Icon(_isPasswordVisible ? Icons.visibility : Icons.visibility_off),
                  onPressed: () => setState(() => _isPasswordVisible = !_isPasswordVisible),
                ),
                filled: true,
                fillColor: AppTheme.bgLightGrey,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
              ),
            ),

            const SizedBox(height: 30),

            // LOGIN BUTTON WITH SPINNER
            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton(
                onPressed: _isLoading ? null : _handleLogin,
                child: _isLoading 
                  ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) 
                  : const Text("Login", style: TextStyle(color: Colors.white, fontSize: 16)),
              ),
            ),

            const SizedBox(height: 25),

            // SIGNUP REDIRECT
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text("Don't have an account?"),
                TextButton(
                  onPressed: () {
                    Navigator.push(context, MaterialPageRoute(builder: (context) => SignupScreen(role: widget.role)));
                  },
                  child: const Text("Sign Up", style: TextStyle(color: AppTheme.primaryTeal, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}