from rest_framework import serializers
from .models import Counterparty, Transaction, SicCode

class TransactionSerializer(serializers.ModelSerializer):


    class Meta:
        model = Transaction
        fields = ('id', 'amount', 'currency', 'description', 'transaction_timestamp', 'counterparty',)


class CounterpartySerializer(serializers.ModelSerializer):

    transactions = TransactionSerializer(many=True)

    class Meta:
        model = Counterparty
        fields = ('id', 'companyname', 'companyregistration', 'image', 'sicCodes', 'transactions')

    def create(self, data):
        transactions_data = data.pop('transactions')
        sicCodes_data = data.pop('sicCodes')
        counterparty = Counterparty.objects.create(**data)
        counterparty.sicCodes.set(sicCodes_data)
        for transaction_data in transactions_data:
            Transaction.objects.create(counterparty=counterparty, **transaction_data)
        return counterparty



class PopulatedTransactionSerializer(TransactionSerializer):

    counterparties = CounterpartySerializer(many=True)


    class Meta(TransactionSerializer.Meta):
        fields = ('id', 'amount', 'currency', 'description', 'transaction_timestamp', 'counterparties',)


class SicCodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = SicCode
        fields = ('id', 'sicnumber',)


class PopulatedCounterpartySerializer(CounterpartySerializer):

    transactions = TransactionSerializer(many=True)
    sicCodes = SicCodeSerializer(many=True)
