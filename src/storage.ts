import { faker } from '@faker-js/faker';
import type { Subscribable, StorageData, StorageSubscriber } from '@/types';
import { sortBy } from '@/helpers/helpers';

const PLAYERS_NUMBER = 70;

function calculateRank(data: StorageData) {
  return sortBy(data, 'score', true).map((player, index) => ({
    ...player,
    rank: index + 1,
    trend: index + 1 - player.rank
  }));
}

export function generateInitialData(): StorageData {
  let id = 0;
  const initialData =  Array.from({ length: PLAYERS_NUMBER }, () => ({
    id: id++,
    player: faker.name.fullName(),
    score: faker.datatype.number({ min: 500, max: 3000 }),
    country: faker.address.country(),
    rank: 1,
    points: 0,
    coinsSpent: 0,
    coinsSpentInPercent: 0,
    trend: 0
  }));
  return calculateRank(initialData).map(player => ({ ...player, trend: 0 }));
}

class ObservableStorage implements Subscribable {
  private subscribers: StorageSubscriber[] = [];
  protected maxCoins = 1000;

  constructor(protected data: StorageData) {}

  subscribe(subscriber: StorageSubscriber) {
    subscriber(this.data);
    this.subscribers.push(subscriber);
    return () => {
      this.subscribers = this.subscribers.filter(subscriber => subscriber !== subscriber);
    };
  }

  protected next(newData: StorageData) {
    this.data = newData;
    this.subscribers.forEach(subscriber => subscriber(newData));
  }
}

function generateCoinsSpent(prevValue: number, max: number = 100): number {
  if (prevValue >= max) return max;
  const coins = prevValue + faker.datatype.number({ min: 0, max: 20 });
  return coins > max ? max : coins;
}

class UpdatableStorage extends ObservableStorage {
  private get timeout(): number {
    return faker.datatype.number({ min: 150, max: 300 });
  }

  constructor(initialData: StorageData) {
    super(initialData);
  }

  startStream() {
    setTimeout(() => this.start(), this.timeout);
  }

  private start() {
    const newData = this.data.map(player => {
      const points = faker.datatype.number({ min: 0, max: 20 });
      const coinsSpent = generateCoinsSpent(player.coinsSpent, this.maxCoins);

      return {
        ...player,
        points,
        score: player.score + points,
        coinsSpent,
        coinsSpentInPercent: coinsSpent * 100 / this.maxCoins
      };
    });

    this.next(calculateRank(newData));
    setTimeout(() => this.start(), this.timeout);
  }
}

export function createUpdatableStorage(): Subscribable {
  const initialData = generateInitialData();
  const storage = new UpdatableStorage(initialData);
  storage.startStream();
  return storage;
}




