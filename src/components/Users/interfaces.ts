interface UserInterface {
    email: string;
    username: string;
    password: string;
};

interface RentedContentInterface {
    //UserID
    //MovieID
    //TVSeriesID
    beginningTime: string;
    endTime: string;
    amountPaid: number;
};

export { UserInterface, RentedContentInterface };
