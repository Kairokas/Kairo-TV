interface UserInterface {
    email: string;
    username: string;
    password: string;
};

interface UserInterfaceFromDB extends UserInterface {
    id: number;
};

interface UserInterfaceWithRolesFromDB {
    username: string;
    roles: string[];
}

interface RentedContentInterface {
    //UserID
    //MovieID
    //TVSeriesID
    beginningTime: string;
    endTime: string;
    amountPaid: number;
};

export { UserInterface, RentedContentInterface, UserInterfaceFromDB, UserInterfaceWithRolesFromDB };
