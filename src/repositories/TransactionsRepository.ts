import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface AllTransactionsDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance | undefined;

  constructor() {
    this.transactions = [];
  }

  public all(): AllTransactionsDTO {
    const temp = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return temp;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, obj) => {
      return obj.type === 'income' ? total + obj.value : total;
    }, 0);

    const outcome = this.transactions.reduce((total, obj) => {
      return obj.type === 'outcome' ? total + obj.value : total;
    }, 0);

    const total = income - outcome;

    const balanceData: Balance = {
      income,
      outcome,
      total,
    };
    return balanceData;
  }

  public create({ title, value, type }: CreateTransactionsDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
