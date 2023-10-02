import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:total_pos/models/dto/update_category_dto.dart';
import 'package:total_pos/providers/categories_state_provider.dart';
import 'package:total_pos/widgets/dialogs/bool_dialog.dart';
import 'package:total_pos/widgets/dialogs/update_one_field_dialog.dart';

class CategoriesTable extends ConsumerWidget {
  const CategoriesTable({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(categoriesStateProvider);
    final categoriesStateMethods = ref.watch(categoriesStateProvider.notifier);
    final deleteCategory =
        ref.read(categoriesStateProvider.notifier).deleteCategory;
    return DataTable(
        columns: [
          DataColumn(
              label: Text(
            'ID',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Nombre',
            style: Theme.of(context).textTheme.titleMedium,
          )),
          DataColumn(
              label: Text(
            'Opciones',
            style: Theme.of(context).textTheme.titleMedium,
          )),
        ],
        rows: state
            .map((category) => DataRow(cells: [
                  DataCell(Text(category.id.toString())),
                  DataCell(Text(category.name),
                      showEditIcon: true,
                      onTap: () => showUpdateOneFieldDialog(
                          context,
                          'Actualizar categoria #${category.id}',
                          '',
                          false,
                          'Nombre',
                          (newName) => categoriesStateMethods.updateCategory(
                              UpdateCategoryDTO(
                                  id: category.id, name: newName)))),
                  DataCell(ElevatedButton(
                      onPressed: () => showBoolDialog(
                                  context,
                                  'Eliminar Categoria',
                                  '¿Esta seguro que desea eliminar la categoria "${category.name}" con ID: ${category.id}?')
                              .then((isOk) {
                            if (isOk ?? false) deleteCategory(category);
                          }),
                      child:
                          const Icon(Icons.delete_rounded, color: Colors.red))),
                ]))
            .toList());
  }
}
