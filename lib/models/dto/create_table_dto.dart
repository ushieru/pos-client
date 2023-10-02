class CreateTableDTO {
  final String name;
  final int posX;
  final int posY;

  CreateTableDTO({required this.name, required this.posX, required this.posY});

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'pos_x': posX,
      'pos_y': posY,
    };
  }
}
