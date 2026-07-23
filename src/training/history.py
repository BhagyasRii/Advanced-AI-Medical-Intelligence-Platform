class History:

    def __init__(self):

        self.train_loss = []
        self.train_acc = []

        self.val_loss = []
        self.val_acc = []

    def update(
        self,
        train_loss,
        train_acc,
        val_loss,
        val_acc,
    ):

        self.train_loss.append(train_loss)
        self.train_acc.append(train_acc)

        self.val_loss.append(val_loss)
        self.val_acc.append(val_acc)