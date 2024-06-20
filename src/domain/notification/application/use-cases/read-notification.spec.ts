import { makeNotification } from 'test/factories/make-notification';
import { ReadNotificationUseCase } from './read-notification';
import { InMemoryNotificationsRepository } from 'test/respositories/in-memory-notifications-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

let inMemoryNotificationRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository);
  });

  it('should be able to read a notification', async () => {
    const notification = makeNotification();

    await inMemoryNotificationRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-1'),
    });

    await inMemoryNotificationRepository.create(notification);

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-2',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
