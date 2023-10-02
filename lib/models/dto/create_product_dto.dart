class CreateProductDTO {
  const CreateProductDTO(
      {required this.description, required this.name, required this.price});

  final String description;
  final String name;
  final String price;

  Map<String, String> toJson() => {
        'description': description,
        'name': name,
        'price': price,
      };
}
