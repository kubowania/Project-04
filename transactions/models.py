from django.db import models

class SicCode(models.Model):
    sicnumber = models.CharField(max_length=8)
    def __str__(self):
        return self.sicnumber


# Create your models here.
class Transaction(models.Model):
    reference = models.CharField(max_length=10)
    amount = models.FloatField()
    currency = models.CharField(max_length=3)
    description = models.CharField(max_length=50)
    transaction_timestamp = models.DateTimeField(auto_now_add=True)
    counterparty = models.ForeignKey('Counterparty', related_name='transactions', on_delete=models.CASCADE)


    class Meta:
        ordering = ['transaction_timestamp']

    def __str__(self):
        return f'{self.amount} - {self.currency}'


class Counterparty(models.Model):
    companyname = models.CharField(max_length=50)
    companyregistration = models.CharField(max_length=8)
    sicCodes = models.ManyToManyField(SicCode, related_name='counterparties')


    def __str__(self):
        return f'{self.companyname}'
