import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type.includes('outcome') && value > total) {
      throw Error('The outcome transaction value is more than your balance');
    }

    const transactionCreated = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transactionCreated;
  }
}

export default CreateTransactionService;
