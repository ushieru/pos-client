import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:total_pos/routes/cashier/cashier_sales/cashier_sales_state.dart';
import 'package:total_pos/widgets/dialogs/pay_ticket_dialog.dart';

class CashierSalesRoute extends ConsumerWidget {
  static const String routeName = '/cashier/sales';
  const CashierSalesRoute({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(cashierSalesStateProvider);
    final stateMethods = ref.read(cashierSalesStateProvider.notifier);
    stateMethods.initState();
    return Scaffold(
        body: Row(children: [
      Expanded(
          child: Column(children: [
        SizedBox(
            width: double.maxFinite,
            child: Card(
                margin:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Row(
                        children: state.categories
                            .map((category) => Padding(
                                  padding: const EdgeInsets.only(right: 10),
                                  child: ElevatedButton(
                                    onPressed: () => stateMethods
                                        .getProductsByCategory(category),
                                    child: Text(category.name),
                                  ),
                                ))
                            .toList())))),
        Expanded(
            child: Card(
                margin:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: SizedBox(
                      height: 100,
                      child: state.products.isNotEmpty
                          ? GridView.count(
                              crossAxisCount: 6,
                              crossAxisSpacing: 10,
                              mainAxisSpacing: 10,
                              children: state.products
                                  .map((product) => Card(
                                      color: Colors.grey.shade900,
                                      child: Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                Text(product.name),
                                                Text('\$${product.price}'),
                                                const Expanded(
                                                    child: SizedBox()),
                                                Align(
                                                    alignment:
                                                        Alignment.centerRight,
                                                    child: FilledButton(
                                                      onPressed: () =>
                                                          stateMethods
                                                              .addProduct(
                                                                  product),
                                                      child:
                                                          const Text('Agregar'),
                                                    ))
                                              ]))))
                                  .toList())
                          : const LinearProgressIndicator(),
                    )))),
      ])),
      SizedBox(
          width: 340,
          height: double.maxFinite,
          child: Card(
              child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(children: [
                    Row(children: [
                      Text('Ticket',
                          style: Theme.of(context).textTheme.titleLarge),
                      const Expanded(child: SizedBox()),
                      if (state.ticket != null)
                        Text('#${state.ticket!.id}',
                            style: Theme.of(context).textTheme.titleLarge),
                    ]),
                    const Divider(),
                    Expanded(
                        child: ListView(
                            children: (state.ticket?.ticketProducts ?? [])
                                .map((tp) => Card(
                                    color: Colors.grey.shade900,
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 15, vertical: 8),
                                      child: Column(children: [
                                        Row(children: [
                                          Text(tp.product.name),
                                          const Expanded(child: SizedBox()),
                                          Text('\$${tp.product.price} c/u'),
                                        ]),
                                        const SizedBox(height: 10),
                                        Row(children: [
                                          IconButton(
                                              onPressed: () => stateMethods
                                                  .deleteProduct(tp.product),
                                              icon: Icon(tp.quantity > 1
                                                  ? Icons.remove
                                                  : Icons.delete)),
                                          Text(tp.quantity.toString()),
                                          IconButton(
                                              onPressed: () => stateMethods
                                                  .addProduct(tp.product),
                                              icon: const Icon(Icons.add)),
                                          const Expanded(child: SizedBox()),
                                          Text(
                                              '\$${tp.quantity * tp.product.price}'),
                                        ]),
                                      ]),
                                    )))
                                .toList())),
                    const Divider(),
                    Card(
                        color: Colors.grey.shade900,
                        child: Padding(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 15, vertical: 8),
                            child: Row(children: [
                              const Text('Total:'),
                              const Expanded(child: SizedBox()),
                              Text('\$${state.ticket?.total ?? 0}'),
                            ]))),
                    const Divider(),
                    Row(children: [
                      Expanded(
                        child: FilledButton.icon(
                            onPressed: state.ticket != null &&
                                    state.ticket!.ticketProducts.isEmpty
                                ? () => stateMethods.deleteTicket().then((_) {
                                      stateMethods.resetInitState();
                                      context.pop();
                                    })
                                : null,
                            icon: const Icon(Icons.cancel),
                            label: const Text('Cancel')),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: FilledButton.icon(
                            onPressed: state.ticket != null &&
                                    state.ticket!.ticketProducts.isNotEmpty
                                ? () =>
                                    showPayTicketDialog(context, state.ticket!)
                                        .then((showPayTicketDialogResponse) {
                                      if (showPayTicketDialogResponse ??
                                          false) {
                                        stateMethods
                                            .payTicket()
                                            .then((isResponseOk) {
                                          if (isResponseOk) {
                                            stateMethods.resetInitState();
                                            context.pop();
                                          }
                                        });
                                      }
                                    })
                                : null,
                            icon: const Icon(Icons.attach_money),
                            label: const Text('Pagar')),
                      ),
                    ]),
                  ])))),
    ]));
  }
}
