<?php

namespace App\Filament\Resources\HelpTickets\Pages;

use App\Filament\Resources\HelpTickets\HelpTicketResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditHelpTicket extends EditRecord
{
    protected static string $resource = HelpTicketResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
    protected function mutateFormDataBeforeSave(array $data): array
{
    if (!empty($data['admin_reply'])) {
        $data['status'] = 'replied';
    } else {
        $data['status'] = 'pending';
    }

    return $data;
}
}
