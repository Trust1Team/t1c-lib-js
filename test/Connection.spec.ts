/**
 * @author Maarten Casteels
 * @since 2016
 */
import { Config, Connection } from '../src/Trust1Team';
import { expect } from 'chai';
//import { sinon } from 'sinon';

describe('Connection', () => {
    let connection:Connection;
    //var request = sinon.spy();

    beforeEach(() => {
        connection = new Connection(new Config());
    });

});