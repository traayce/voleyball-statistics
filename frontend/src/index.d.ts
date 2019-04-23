import * as Redux from 'redux';
import { IStore } from "./store/state";
declare global {
  /**
   * Shows if it's production
   */
  const __PROD__: boolean;

  /**
   * Shows if redux devtools are enabled
   */
  const __DEVTOOLS__: boolean;

  /**
   * Shows if the code is executing in browser
   */
  const __CLIENT__: boolean;

  interface System {
    /**
     * Dynamically import modules
     *
     * @param {string} request
     * @returns {Promise<any>}
     *
     * @memberof System
     */
    import(request: string): Promise<any>
  }

  /**
   * Webpack API
   */
  const System: System

  /**
   * Hot Module Replacement API
   * Injects updated modules into runtime
   * @interface Module
   */
  interface Module {
    hot: {
      accept: (path: string, cb: () => void) => void;
    };
  }

  interface Window {
    __PRELOADED_STATE__: IStore;
  }
}
