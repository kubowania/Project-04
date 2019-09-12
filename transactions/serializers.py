from rest_framework import serializers
from .models import Counterparty, Transaction, SicCode

class TransactionSerializer(serializers.ModelSerializer):


    class Meta:
        model = Transaction
        fields = ('id', 'reference', 'amount', 'currency', 'description', 'transaction_timestamp', 'counterparty',)


class CounterpartySerializer(serializers.ModelSerializer):

    transactions = TransactionSerializer(many=True)

    class Meta:
        model = Counterparty
        fields = ('id', 'companyname', 'companyregistration', 'sicCodes', 'note', 'transactions')

    def create(self, data):
        transactions_data = data.pop('transactions')
        sicCodes_data = data.pop('sicCodes')
        counterparty = Counterparty.objects.create(**data)
        counterparty.sicCodes.set(sicCodes_data)
        for transaction_data in transactions_data:
            Transaction.objects.create(counterparty=counterparty, **transaction_data)
        return counterparty

    def update(self, instance, data):
        sicCodes_data = data.pop('sicCodes')
        instance.companyname = data.get('companyname', instance.companyname)
        instance.companyregistration = data.get('companyregistration', instance.companyregistration)
        instance.note = data.get('note', instance.note)
        instance.sicCodes.set(sicCodes_data)
        # for transaction_data in transactions_data:
        #     Transaction.objects.create(counterparty=counterparty, **transaction_data)
        instance.save()
        return instance


class PopulatedTransactionSerializer(TransactionSerializer):

    counterparty = CounterpartySerializer()


    class Meta(TransactionSerializer.Meta):
        fields = ('id', 'reference', 'amount', 'currency', 'description', 'transaction_timestamp', 'counterparty',)


class SicCodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = SicCode
        fields = ('id', 'sicnumber',)


class PopulatedCounterpartySerializer(CounterpartySerializer):

    transactions = TransactionSerializer(many=True)
    sicCodes = SicCodeSerializer(many=True)
