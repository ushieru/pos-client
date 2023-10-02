import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/models/dto/create_product_dto.dart';
import 'package:total_pos/providers/products_state_provider.dart';

class _CreateProductDialog extends ConsumerWidget {
  _CreateProductDialog();

  final TextEditingController nameController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController priceController = TextEditingController();

  @override
  Widget build(BuildContext context, WidgetRef ref) => SimpleDialog(
          title: const Text('Nueva Categoria'),
          contentPadding: const EdgeInsets.all(30),
          children: [
            TextFormField(
                autofocus: true,
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Nombre')),
            TextFormField(
                controller: descriptionController,
                decoration: const InputDecoration(labelText: 'Descripcion')),
            TextFormField(
                controller: priceController,
                keyboardType: TextInputType.number,
                inputFormatters: [
                  FilteringTextInputFormatter.digitsOnly,
                ],
                decoration: const InputDecoration(
                  labelText: 'Precio',
                )),
            const SizedBox(height: 25),
            Row(mainAxisAlignment: MainAxisAlignment.end, children: [
              SizedBox(
                  width: 120,
                  child: OutlinedButton(
                      onPressed: () => context.pop(),
                      child: const Text('Cancelar'))),
              const SizedBox(width: 25),
              SizedBox(
                  width: 120,
                  child: ElevatedButton(
                      onPressed: () => ref
                          .read(productsStateProvider.notifier)
                          .createProduct(CreateProductDTO(
                              name: nameController.text,
                              description: descriptionController.text,
                              price: priceController.text))
                          .then((_) => context.pop()),
                      child: const Text('Aceptar')))
            ])
          ]);
}

Future<void> showCreateProductDialog(BuildContext context) => showDialog(
    context: context,
    builder: (BuildContext context) => _CreateProductDialog());
