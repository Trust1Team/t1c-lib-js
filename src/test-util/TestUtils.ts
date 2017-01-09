/**
 * Created by maarten on 1/9/17.
 */

function check( done, f ) {
    try {
        f();
        done();
    } catch( e ) {
        done( e );
    }
}


class TestUtil {
    public static asyncCheck = check;
}

export { TestUtil }