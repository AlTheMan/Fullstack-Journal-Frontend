

// SseApi.ts
export class SseApi {
    private eventSource: EventSource | null = null;
  
    constructor(private url: string) {}
  
    public connect(onMessage: (data: any) => void, onError?: (error: any) => void) {
      this.eventSource = new EventSource(this.url);
  
      this.eventSource.onmessage = event => {
        const data = JSON.parse(event.data);
        onMessage(data);
      };
  
      this.eventSource.onerror = event => {
        if (onError) {
          onError(event);
        }
      };
    }
  
    public disconnect() {
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }
    }
  }
  
  export default SseApi;
  