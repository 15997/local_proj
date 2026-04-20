import 'package:flutter/material.dart';
import 'dart:async';
import '../core/app_theme.dart';
import '../widgets/service_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  // --- Slideshow State ---
  final PageController _pageController = PageController();
  int _currentSlide = 0;
  final List<Map<String, String>> _slides = [
    {"title": "Verified Professionals", "desc": "Find trusted experts in Addis."},
    {"title": "RAG AI Search", "desc": "Chat with our AI to find services."},
    {"title": "Quick Booking", "desc": "Scan to verify provider identity."},
  ];

  // --- Traditional Filter State ---
  bool _isFilterExpanded = false; 
  String? _selectedLocation;
  String? _selectedJob;
  double _minRating = 4.0;

  @override
  void initState() {
    super.initState();
    Timer.periodic(const Duration(seconds: 4), (timer) {
      if (_pageController.hasClients) {
        setState(() {
          _currentSlide = (_currentSlide + 1) % _slides.length;
        });
        _pageController.animateToPage(_currentSlide,
            duration: const Duration(milliseconds: 800), curve: Curves.easeInOut);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 60),

            // 1. WELCOME HEADER
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Welcome back,", style: TextStyle(color: Colors.grey, fontSize: 16)),
                  Text("client!", style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold)),
                ],
              ),
            ),

            const SizedBox(height: 25),

            // 2. FEATURE SLIDESHOW
            SizedBox(
              height: 160,
              child: PageView.builder(
                controller: _pageController,
                itemCount: _slides.length,
                itemBuilder: (context, index) => _buildSlide(_slides[index]),
              ),
            ),

            const SizedBox(height: 30),

            // 3. CLICKABLE TRADITIONAL FILTERING SECTION
            _buildClickableFilterSection(),

            const SizedBox(height: 20),

            // 4. RAG AI CHATBOT BANNER
            _buildAIBanner(context),

            // 5. TOP RATED PROVIDERS
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              child: Text("Best Rated Professionals", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: [
                  ServiceCard(title: "Kebede Plumbing", category: "Plumber", rating: "4.9"),
                  ServiceCard(title: "Almaz Electricals", category: "Electrician", rating: "4.7"),
                ],
              ),
            ),
            const SizedBox(height: 30),
          ],
        ),
      ),
    );
  }

  // --- NEW: Clickable Filter UI ---
  Widget _buildClickableFilterSection() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          InkWell(
            onTap: () => setState(() => _isFilterExpanded = !_isFilterExpanded),
            borderRadius: BorderRadius.circular(15),
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.teal.withOpacity(0.1),
                borderRadius: BorderRadius.circular(15),
                border: Border.all(color: Colors.teal.withOpacity(0.3)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.filter_list, color: Colors.teal),
                      SizedBox(width: 12),
                      Text("Traditional Filtering", 
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  Icon(_isFilterExpanded ? Icons.expand_less : Icons.expand_more, color: Colors.teal),
                ],
              ),
            ),
          ),
          
          // The "Pop up" part of the filter
          if (_isFilterExpanded)
            Container(
              margin: const EdgeInsets.only(top: 10),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey[50],
                borderRadius: BorderRadius.circular(15),
                border: Border.all(color: Colors.grey[200]!),
              ),
              child: Column(
                children: [
                  _buildDropdown("Select Location", ["4 Kilo", "6 Kilo", "Piassa", "Bole","cmc"], _selectedLocation, (v) => setState(() => _selectedLocation = v)),
                  const SizedBox(height: 12),
                  _buildDropdown("Select Job Type", ["Plumber", "Electrician", "Tutor", "Cleaner"], _selectedJob, (v) => setState(() => _selectedJob = v)),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      const Text("Min Rating: ", style: TextStyle(fontWeight: FontWeight.w500)),
                      Expanded(
                        child: Slider(
                          value: _minRating,
                          min: 1, max: 5, divisions: 4,
                          activeColor: Colors.teal,
                          onChanged: (v) => setState(() => _minRating = v),
                        ),
                      ),
                      Text("${_minRating.toStringAsFixed(1)} ★"),
                    ],
                  ),
                  const SizedBox(height: 15),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(backgroundColor: Colors.teal),
                      onPressed: () => _performSearch(),
                      child: const Text("Search Service Provider", style: TextStyle(color: Colors.white)),
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  // --- Helper Widgets ---
  Widget _buildSlide(Map<String, String> slide) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(colors: [Colors.teal, Color(0xFF004D40)]),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(slide['title']!, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Text(slide['desc']!, style: const TextStyle(color: Colors.white70, fontSize: 14)),
        ],
      ),
    );
  }

  Widget _buildDropdown(String hint, List<String> items, String? value, Function(String?) onChanged) {
    return DropdownButtonFormField<String>(
      decoration: const InputDecoration(border: OutlineInputBorder(), fillColor: Colors.white, filled: true),
      hint: Text(hint),
      value: value,
      items: items.map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
      onChanged: onChanged,
    );
  }

  Widget _buildAIBanner(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: ListTile(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
        tileColor: Colors.teal[50],
        leading: const Icon(Icons.auto_awesome, color: Colors.teal),
        title: const Text("Ask RAG AI Assistant", style: TextStyle(fontWeight: FontWeight.bold)),
        subtitle: const Text("Conversational search for your needs."),
        onTap: () => Navigator.pushNamed(context, '/chatbot'),
      ),
    );
  }

  void _performSearch() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text("Searching for $_selectedJob in $_selectedLocation...")),
    );
  }
}