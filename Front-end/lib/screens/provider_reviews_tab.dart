import 'package:flutter/material.dart';
import '../core/app_theme.dart';

class ProviderReviewsTab extends StatelessWidget {
  const ProviderReviewsTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        title: const Text("Reviews & Ratings", 
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. SUMMARY RATING CARD
            _buildRatingSummaryCard(),

            const SizedBox(height: 30),

            // 2. REVIEWS LIST
            _buildReviewItem(
              name: "Abebe Kebede",
              date: "2 days ago",
              rating: 5,
              comment: "Fantastic service! The provider was professional, punctual, and did an excellent job. I would highly recommend them to anyone.",
              hasReply: false,
            ),
            
            const Divider(height: 40),

            _buildReviewItem(
              name: "Hana Lemma",
              date: "1 week ago",
              rating: 4,
              comment: "Very good experience overall. The work was completed to a high standard. Communication could have been slightly better, but I'm happy with the result.",
              hasReply: true,
              replyText: "Thank you, Hana! We appreciate your feedback and are glad you're happy with the result. We'll work on improving our communication.",
            ),
          ],
        ),
      ),
    );
  }

  // --- UI COMPONENTS ---

  Widget _buildRatingSummaryCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.bgLightGrey),
      ),
      child: Column(
        children: [
          Row(
            children: [
              // Left side: Big Number
              Column(
                children: [
                  const Text("4.8", style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold)),
                  Row(
                    children: List.generate(5, (index) => const Icon(Icons.star, color: Colors.orange, size: 16)),
                  ),
                  const SizedBox(height: 5),
                  const Text("from 120 reviews", style: TextStyle(color: Colors.grey, fontSize: 12)),
                ],
              ),
              const SizedBox(width: 30),
              // Right side: Bar Charts
              Expanded(
                child: Column(
                  children: [
                    _buildStatBar("5", 0.85),
                    _buildStatBar("4", 0.10),
                    _buildStatBar("3", 0.02),
                    _buildStatBar("2", 0.02),
                    _buildStatBar("1", 0.01),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatBar(String label, double percent) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        children: [
          Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
          const SizedBox(width: 8),
          Expanded(
            child: LinearProgressIndicator(
              value: percent,
              backgroundColor: AppTheme.bgLightGrey,
              color: Colors.orange,
              minHeight: 4,
            ),
          ),
          const SizedBox(width: 8),
          Text("${(percent * 100).toInt()}%", style: const TextStyle(fontSize: 10, color: Colors.grey)),
        ],
      ),
    );
  }

  Widget _buildReviewItem({
    required String name,
    required String date,
    required int rating,
    required String comment,
    bool hasReply = false,
    String? replyText,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const CircleAvatar(radius: 18, backgroundColor: AppTheme.bgLightGrey, child: Icon(Icons.person, color: Colors.grey)),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                Text(date, style: const TextStyle(color: Colors.grey, fontSize: 12)),
              ],
            ),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          children: List.generate(5, (index) => Icon(Icons.star, color: index < rating ? Colors.orange : Colors.grey[300], size: 16)),
        ),
        const SizedBox(height: 8),
        Text(comment, style: const TextStyle(fontSize: 14, height: 1.4, color: Colors.black87)),
        
        const SizedBox(height: 12),
        
        if (!hasReply)
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primaryTeal,
              minimumSize: const Size(80, 32),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
            child: const Text("Reply", style: TextStyle(fontSize: 12, color: Colors.white)),
          ),

        if (hasReply)
          Container(
            margin: const EdgeInsets.only(top: 10, left: 15),
            padding: const EdgeInsets.only(left: 15),
            decoration: const BoxDecoration(
              border: Border(left: BorderSide(color: AppTheme.primaryTeal, width: 2)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text("Your Reply", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                Text("2 days ago", style: const TextStyle(color: Colors.grey, fontSize: 11)),
                const SizedBox(height: 5),
                Text(replyText!, style: const TextStyle(fontSize: 13, height: 1.4, color: Colors.black54)),
              ],
            ),
          ),
      ],
    );
  }
}