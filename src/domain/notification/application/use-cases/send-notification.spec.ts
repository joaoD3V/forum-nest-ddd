import { SendNotificationUseCase } from './send-notification';
import { InMemoryNotificationsRepository } from 'test/respositories/in-memory-notifications-repository';

let inMemoryNotificationRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationRepository);
  });

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação',
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification
    );
  });
});
