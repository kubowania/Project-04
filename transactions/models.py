from django.db import models

class SicCode(models.Model):
    sicnumber = models.IntegerField()
    def __str__(self):
        return self.sicnumber

class Counterparty(models.Model):
    companyname = models.CharField(max_length=50)
    companyregistration = models.CharField(max_length=8)
    image = models.CharField(max_length=200, blank=True)
    sicCodes = models.ManyToManyField(SicCode, related_name='counterparties')

    def __str__(self):
        return f'{self.companyname}'



# Create your models here.
class Transaction(models.Model):
    amount = models.CharField(max_length=10)
    currency = models.CharField(max_length=3)
    description = models.CharField(max_length=50)
    transaction_timestamp = models.DateTimeField(auto_now_add=True)
    counterparty = models.ForeignKey(Counterparty, related_name='transactions', on_delete=models.CASCADE)

    class Meta:
        ordering = ['transaction_timestamp']

    def __str__(self):
        return f'{self.amount} - {self.currency}'
