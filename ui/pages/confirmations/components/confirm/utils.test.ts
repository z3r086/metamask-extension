import { TransactionMeta } from '@metamask/transaction-controller';
import {
  CONTRACT_INTERACTION_SENDER_ADDRESS,
  genUnapprovedContractInteractionConfirmation,
} from '../../../../../test/data/confirmations/contract-interaction';
import {
  PERSONAL_SIGN_SENDER_ADDRESS,
  unapprovedPersonalSignMsg,
} from '../../../../../test/data/confirmations/personal_sign';
import { SignatureRequestType } from '../../types/confirm';
import { formatNumber, getConfirmationSender } from './utils';

describe('confirm - utils', () => {
  describe('getConfirmationSender()', () => {
    test("returns the sender address from a signature if it's passed", () => {
      const testCurrentConfirmation =
        genUnapprovedContractInteractionConfirmation() as TransactionMeta;
      const { from } = getConfirmationSender(testCurrentConfirmation);

      expect(from).toEqual(CONTRACT_INTERACTION_SENDER_ADDRESS);
    });

    test("returns the sender address from a transaction if it's passed", () => {
      const { from } = getConfirmationSender(
        unapprovedPersonalSignMsg as SignatureRequestType,
      );

      expect(from).toEqual(PERSONAL_SIGN_SENDER_ADDRESS);
    });

    test('returns no sender address if no confirmation is passed', () => {
      const testCurrentConfirmation = undefined;
      const { from } = getConfirmationSender(testCurrentConfirmation);

      expect(from).toEqual(undefined);
    });
  });

  describe('formatNumber()', () => {
    test('formats number according to decimal places passed', () => {
      expect(formatNumber(123456, 2)).toEqual('123,456.00');
      expect(formatNumber(123456, 0)).toEqual('123,456');
      expect(formatNumber(123456, 7)).toEqual('123,456.0000000');
    });
  });
});
