export class TestHelper {
  /**
   * Set true for global control - logging for all tests
   * Otherwise import and set individually in tests
   */
  public static debug: boolean = true;
}

export const tLog = function (...args) {
  if (TestHelper.debug) {
    console.log(args);
  }
};
