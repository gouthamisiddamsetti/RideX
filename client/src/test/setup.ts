import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.stubGlobal(
  'IntersectionObserver',
  class IntersectionObserverMock implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '0px';
    readonly thresholds = [0];

    constructor(private callback: IntersectionObserverCallback) {}

    observe(target: Element) {
      const bounds = target.getBoundingClientRect();
      this.callback(
        [
          {
            boundingClientRect: bounds,
            intersectionRatio: 1,
            intersectionRect: bounds,
            isIntersecting: true,
            rootBounds: null,
            target,
            time: performance.now(),
          },
        ],
        this
      );
    }

    unobserve() {}

    disconnect() {}

    takeRecords() {
      return [];
    }
  }
);

// Mock Leaflet for testing environment (jsdom does not have full DOM canvas/SVG layout)
vi.mock('leaflet', () => {
  return {
    default: {
      map: vi.fn(() => ({
        setView: vi.fn(),
        remove: vi.fn(),
        on: vi.fn(),
        flyTo: vi.fn(),
        fitBounds: vi.fn(),
      })),
      tileLayer: vi.fn(() => ({
        addTo: vi.fn(),
      })),
      marker: vi.fn(() => ({
        bindPopup: vi.fn().mockReturnThis(),
        addTo: vi.fn(),
      })),
      polyline: vi.fn(() => ({
        addTo: vi.fn(),
        getBounds: vi.fn(() => ({})),
      })),
      layerGroup: vi.fn(() => ({
        addTo: vi.fn(),
        clearLayers: vi.fn(),
        addLayer: vi.fn(),
      })),
      divIcon: vi.fn(() => ({})),
      control: {
        zoom: vi.fn(() => ({
          addTo: vi.fn(),
        })),
      },
    },
  };
});
