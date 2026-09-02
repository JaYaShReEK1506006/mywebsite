public class testcase {
    static {
        System.out.println("Manual Testing done by Jayashree k");
    }

    public static void main(String args[]) {
        Calculator c = new Calculator();

        double expected1 = 8;
        double sum1 = c.add(5, 3);
        if (expected1 == sum1) {
            System.out.println("Test case 1 for add() is passed");
        }

        double expected2 = -8;
        double sum2 = c.add(-5, -3);
        if (expected2 == sum2) {
            System.out.println("Test case 2 for add() is passed");
        }

        double expected3 = 5;
        double sum3 = c.add(0, 5);
        if (expected3 == sum3) {
            System.out.println("Test case 3 for add() is passed");
        }
        double expected4 = 2;
        double sub1 = c.subtract(5, 3);
        if (expected4 == sub1) {
            System.out.println("Test case 1 for subtract() is passed");
        }

        double expected5 = -2;
        double sub2 = c.subtract(-5, -3);
        if (expected5 == sub2) {
            System.out.println("Test case 2 for subtract() is passed");
        }

        double expected6 = -5;
        double sub3 = c.subtract(0, 5);
        if (expected6 == sub3) {
            System.out.println("Test case 3 for subtract() is passed");
        }
        double expected7 = 15;
        double mul1 = c.multiply(5, 3);
        if (expected7 == mul1) {
            System.out.println("Test case 1 for multiply() is passed");
        }

        double expected8 = 15;
        double mul2 = c.multiply(-5, -3);
        if (expected8 == mul2) {
            System.out.println("Test case 2 for multiply() is passed");
        }

        double expected9 = 0;
        double mul3 = c.multiply(0, 5);
        if (expected9 == mul3) {
            System.out.println("Test case 3 for multiply() is passed");
        }
        double expected10 = 1.6666666666666667;
        double div1 = c.divide(5, 3);
        if (Math.abs(expected10 - div1) < 0.0001) {
            System.out.println("Test case 1 for divide() is passed");
        }

        double expected11 = 1.6666666666666667;
        double div2 = c.divide(-5, -3);
        if (Math.abs(expected11 - div2) < 0.0001) {
            System.out.println("Test case 2 for divide() is passed");
        }

        try {
            double div3 = c.divide(5, 0);
            System.out.println("Test case 3 for divide() is FAILED (no exception thrown)");
        } catch (ArithmeticException e) {
            System.out.println("Test case 3 for divide() is passed");
        }
    }
}