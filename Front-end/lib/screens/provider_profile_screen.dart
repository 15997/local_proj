import 'package:flutter/material.dart';
import '../core/app_theme.dart';

class ProviderProfileScreen extends StatefulWidget {
  const ProviderProfileScreen({super.key});

  @override
  State<ProviderProfileScreen> createState() => _ProviderProfileScreenState();
}

class _ProviderProfileScreenState extends State<ProviderProfileScreen> {
  // --- FRONTEND STATE ---
  String selectedCategory = "Plumbing";
  final List<String> categories = [
    "Plumbing", "Electrical", "Painting", 
    "Carpentry", "Cleaning", "Gardening"
  ];

  final List<String> _verificationDocuments = [
    "Kebele_ID.pdf",
    "Electrician_License_2023.jpg"
  ];

  // --- LOGIC FUNCTIONS ---
  void _addDocument() {
    setState(() {
      _verificationDocuments.add("New_Upload_${_verificationDocuments.length + 1}.pdf");
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Document uploaded to frontend cache")),
    );
  }

  void _removeDocument(int index) {
    setState(() {
      _verificationDocuments.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.black, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("My Profile & Services", 
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 10),
            Center(
              child: Column(
                children: [
                  const CircleAvatar(
                    radius: 45,
                    backgroundImage: NetworkImage('https://via.placeholder.com/150'),
                  ),
                  const SizedBox(height: 10),
                  const Text("", 
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      Icon(Icons.check_circle, color: Colors.green, size: 14),
                      SizedBox(width: 4),
                      Text("Verified", style: TextStyle(color: Colors.green, fontSize: 12)),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 25),

            _label("Service Description"),
            TextField(
              maxLines: 4,
              decoration: InputDecoration(
                hintText: "Describe your service in detail...",
                hintStyle: const TextStyle(color: Colors.grey, fontSize: 14),
                filled: true,
                fillColor: AppTheme.bgLightGrey,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
              ),
            ),

            const SizedBox(height: 20),

            _label("Hourly Rate"),
            TextField(
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                hintText: "ETB 0.00",
                filled: true,
                fillColor: AppTheme.bgLightGrey,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
              ),
            ),

            const SizedBox(height: 20),

            _label("Service Categories"),
            Wrap(
              spacing: 8,
              runSpacing: 4,
              children: categories.map((cat) => ChoiceChip(
                label: Text(cat),
                selected: selectedCategory == cat,
                onSelected: (bool selected) {
                  setState(() { selectedCategory = cat; });
                },
                selectedColor: AppTheme.primaryTeal,
                labelStyle: TextStyle(
                  color: selectedCategory == cat ? Colors.white : Colors.black87,
                  fontSize: 12,
                ),
                backgroundColor: AppTheme.bgLightGrey,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              )).toList(),
            ),

            const SizedBox(height: 25),

            _label("Verification Documents"),
            const Text("Please upload a valid Fayda ID and relevant professional licenses.",
                style: TextStyle(fontSize: 11, color: Colors.grey)),
            const SizedBox(height: 12),
            
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _verificationDocuments.length,
              itemBuilder: (context, index) {
                return _documentTile(_verificationDocuments[index], index);
              },
            ),

            const SizedBox(height: 15),

            OutlinedButton.icon(
              onPressed: _addDocument,
              style: OutlinedButton.styleFrom(
                minimumSize: const Size(double.infinity, 50),
                side: const BorderSide(color: AppTheme.primaryTeal),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              icon: const Icon(Icons.file_upload_outlined, color: AppTheme.primaryTeal),
              label: const Text("Upload New Document", 
                style: TextStyle(color: AppTheme.primaryTeal, fontWeight: FontWeight.bold)),
            ),

            const SizedBox(height: 30),

            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text("Changes Saved Successfully!")),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primaryTeal,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text("Save Changes", 
                  style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 30),
          ],
        ),
      ),
    );
  }

  // --- UI HELPERS ---

  Widget _label(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(text, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
    );
  }

  Widget _documentTile(String name, int index) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: AppTheme.bgLightGrey,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          const Icon(Icons.description_outlined, size: 22, color: Colors.blueGrey),
          const SizedBox(width: 12),
          Expanded(child: Text(name, style: const TextStyle(fontSize: 14))),
          IconButton(
            icon: const Icon(Icons.delete_outline, color: Colors.redAccent, size: 22),
            onPressed: () => _removeDocument(index),
          ),
        ],
      ),
    );
  } // FIX: Added missing closing brace for the method
} // FIX: Added missing closing brace for the class