import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:async';
import '../core/app_theme.dart';

class SignupScreen extends StatefulWidget {
  final UserRole role;
  const SignupScreen({super.key, required this.role});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final PageController _pageController = PageController();
  int _currentStep = 0;
  bool _isLoading = false; // FRONTEND: Simulates network waiting

  // Controllers
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _otpController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPassController = TextEditingController();

  Timer? _timer;
  int _secondsRemaining = 120;

  @override
  void dispose() {
    _timer?.cancel();
    _pageController.dispose();
    super.dispose();
  }

  bool _isPhoneValid(String phone) => 
      phone.length == 10 && (phone.startsWith('09') || phone.startsWith('07'));

  void _startTimer() {
    _secondsRemaining = 120;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 0) {
        setState(() => _secondsRemaining--);
      } else {
        _timer?.cancel();
      }
    });
  }

  // FRONTEND MOCK: This simulates the delay of sending an SMS
  Future<void> _simulateSmsSend() async {
    setState(() => _isLoading = true);
    
    // Wait 2 seconds to look "real"
    await Future.delayed(const Duration(seconds: 2));
    
    setState(() => _isLoading = false);
    _startTimer();
    _pageController.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.ease);
    setState(() => _currentStep++);
  }

  void _nextStep() {
    _pageController.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.ease);
    setState(() => _currentStep++);
  }

  @override
  Widget build(BuildContext context) {
    bool isProvider = widget.role == UserRole.provider;

    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => _currentStep > 0 
            ? _pageController.previousPage(duration: const Duration(milliseconds: 300), curve: Curves.ease) 
            : Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          LinearProgressIndicator(
            value: (_currentStep + 1) / 3,
            backgroundColor: AppTheme.bgLightGrey,
            color: AppTheme.primaryTeal,
          ),
          Expanded(
            child: PageView(
              controller: _pageController,
              physics: const NeverScrollableScrollPhysics(),
              children: [
                _buildStep1(isProvider), 
                _buildStep2(),           
                _buildStep3(isProvider), 
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStep1(bool isProvider) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(isProvider ? "Provider Signup" : "Client Signup",
              style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold)),
          const SizedBox(height: 30),
          _inputLabel("First Name"),
          _textField(_firstNameController, "Abebe"),
          const SizedBox(height: 20),
          _inputLabel("Phone Number"),
          TextField(
            controller: _phoneController,
            keyboardType: TextInputType.phone,
            maxLength: 10,
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            decoration: InputDecoration(
              counterText: "",
              hintText: "09... or 07...",
              filled: true,
              fillColor: AppTheme.bgLightGrey,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
            ),
          ),
          const SizedBox(height: 40),
          _actionButton("Send SMS Code", () {
            if (_isPhoneValid(_phoneController.text)) {
              _simulateSmsSend(); // Trigger the fake delay
            } else {
              _showError("Enter valid 10-digit phone (09/07)");
            }
          }),
        ],
      ),
    );
  }

  Widget _buildStep2() {
    String min = (_secondsRemaining ~/ 60).toString();
    String sec = (_secondsRemaining % 60).toString().padLeft(2, '0');

    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        children: [
          const Text("Verify Phone", style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold)),
          const SizedBox(height: 40),
          _textField(_otpController, "Enter 4-digit code", isPhone: true),
          const SizedBox(height: 20),
          Text("Resend in $min:$sec", style: const TextStyle(fontWeight: FontWeight.bold)),
          const Spacer(),
          _actionButton("Verify & Continue", _nextStep),
        ],
      ),
    );
  }

  Widget _buildStep3(bool isProvider) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        children: [
          const Text("Secure Account", style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold)),
          const SizedBox(height: 30),
          _textField(_passwordController, "Password", isPass: true),
          const SizedBox(height: 20),
          _textField(_confirmPassController, "Confirm Password", isPass: true),
          const Spacer(),
          _actionButton("Finish", () {
            Navigator.pushReplacementNamed(context, isProvider ? '/provider_dashboard' : '/home');
          }),
        ],
      ),
    );
  }

  // --- REUSABLE COMPONENTS ---
  void _showError(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg), backgroundColor: Colors.redAccent));
  }

  Widget _inputLabel(String text) => Text(text, style: const TextStyle(fontWeight: FontWeight.bold));

  Widget _textField(TextEditingController controller, String hint, {bool isPhone = false, bool isPass = false}) {
    return TextField(
      controller: controller,
      obscureText: isPass,
      keyboardType: isPhone ? TextInputType.number : TextInputType.text,
      decoration: InputDecoration(
        hintText: hint, filled: true, fillColor: AppTheme.bgLightGrey,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
      ),
    );
  }

  Widget _actionButton(String label, VoidCallback onPressed) {
    return SizedBox(
      width: double.infinity,
      height: 55,
      child: ElevatedButton(
        onPressed: _isLoading ? null : onPressed,
        child: _isLoading 
          ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) 
          : Text(label, style: const TextStyle(color: Colors.white)),
      ),
    );
  }
}