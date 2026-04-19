import 'package:flutter/material.dart';
import '../core/app_theme.dart';

class ServiceCard extends StatelessWidget {
  final String title;    // Added this to match your screenshot
  final String category; // Added this to match your screenshot
  final String rating;
  final bool isVerified;

  const ServiceCard({
    super.key,
    required this.title,    // FIX: This removes the red line in home_screen
    required this.category, // FIX: This removes the red line in home_screen
    required this.rating,
    this.isVerified = true,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.bgLightGrey,
        borderRadius: BorderRadius.circular(15),
      ),
      child: Row(
        children: [
          Container(
            width: 50, height: 50, 
            decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(10)),
            child: const Icon(Icons.person, color: Colors.white),
          ),
          const SizedBox(width: 15),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(category, style: const TextStyle(color: Colors.grey, fontSize: 12)),
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Row(
                  children: [
                    const Icon(Icons.star, 
                    color: AppTheme.accentOrange, 
                    size: 16),
                    Text(" $rating"),
                  ],
                ),
              ],
            ),
          ),
          if (isVerified) const Icon(Icons.verified, color: Colors.green, size: 18),
        ],
      ),
    );
  }
}
