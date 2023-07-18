import { Event } from './event';

describe('Event', () => {
  it('should be able to create a event', () => {
    const event = new Event({
      customersId: '7cb0b681-74df-46d0-bcd7-92424adb92a7',
      endDate: new Date(),
      startDate: new Date(),
      name: 'Event',
      description: 'Event description',
      logo: 'http://example.com/logo.png',
    });

    expect(event).toBeTruthy();
  });
});
