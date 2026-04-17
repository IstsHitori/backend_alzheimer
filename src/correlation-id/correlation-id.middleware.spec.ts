import { CORRELATION_ID_HEADER, CorrelationIdMiddleware } from './correlation-id.middleware';

describe('CorrelationIdMiddleware', () => {
  it('sets correlation id in request and response headers', () => {
    const middleware = new CorrelationIdMiddleware();
    const req: Record<string, unknown> = {};
    const set = jest.fn();
    const next = jest.fn();

    middleware.use(req as any, { set } as any, next);

    expect(req[CORRELATION_ID_HEADER]).toBeDefined();
    expect(set).toHaveBeenCalledWith(
      CORRELATION_ID_HEADER,
      req[CORRELATION_ID_HEADER],
    );
    expect(next).toHaveBeenCalled();
  });
});
