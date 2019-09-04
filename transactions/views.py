from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT


from .models import Transaction, Counterparty
from .serializers import TransactionSerializer, CounterpartySerializer, PopulatedCounterpartySerializer

# Create your views here.
class CounterpartyListView(APIView):

    def get(self, _request):
        counterparties = Counterparty.objects.all() #get all counterparties
        serializer = PopulatedCounterpartySerializer(counterparties, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CounterpartySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class CounterpartyDetailView(APIView):

    def get(self, _request, pk):
        counterparty = Counterparty.objects.get(pk=pk)
        serializer = CounterpartySerializer(counterparty)
        return Response(serializer.data)

    def put(self, request, pk):
        counterparty = Counterparty.objects.get(pk=pk)
        serializer = CounterpartySerializer(counterparty, data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            counterparty = serializer.instance
            serializer = PopulatedCounterpartySerializer(counterparty)
            return Response(serializer.data)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        counterparty = Counterparty.objects.get(pk=pk)
        counterparty.delete()

        return Response(status=HTTP_204_NO_CONTENT)

class TransactionListView(APIView):

    def get(self, _request):
        transactions = Transaction.objects.all() #get all transactions
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class TransactionDetailView(APIView):

    def get(self, _request, pk):
        transaction = Transaction.objects.get(pk=pk)
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)

    def put(self, request, pk):
        transaction = Transaction.objects.get(pk=pk)
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        transaction = Transaction.objects.get(pk=pk)
        transaction.delete()

        return Response(status=HTTP_204_NO_CONTENT)
