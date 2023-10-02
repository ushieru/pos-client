class UpdateProductDTO {
  const UpdateProductDTO({
    required this.id,
    required this.description,
    required this.name,
    required this.price,
  });

  final int id;
  final String description;
  final String name;
  final String price;

  Map<String, String> toJson() => {
        'description': description,
        'name': name,
        'price': price,
      };
}
