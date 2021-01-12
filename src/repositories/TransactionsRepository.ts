import { v4 as uuidv4 } from 'uuid';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface BankStatement {
  transactions: Transaction[];
  balance: Balance;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): BankStatement {
    const bankStatement = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return bankStatement;
  }

  public getBalance(): Balance {
    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    this.transactions.forEach(transaction => {
      balance[transaction.type] += transaction.value;
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ type, value, title }: TransactionDTO): Transaction {
    const transaction = { id: uuidv4(), title, type, value };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
