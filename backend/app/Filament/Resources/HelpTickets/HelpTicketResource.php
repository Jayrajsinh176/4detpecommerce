<?php

namespace App\Filament\Resources\HelpTickets;

use App\Filament\Resources\HelpTickets\Pages\CreateHelpTicket;
use App\Filament\Resources\HelpTickets\Pages\EditHelpTicket;
use App\Filament\Resources\HelpTickets\Pages\ListHelpTickets;
use App\Filament\Resources\HelpTickets\Schemas\HelpTicketForm;
use App\Filament\Resources\HelpTickets\Tables\HelpTicketsTable;
use App\Models\HelpTicket;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class HelpTicketResource extends Resource
{
    protected static ?string $model = HelpTicket::class;

      protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $recordTitleAttribute = 'subject';
    protected static string|\UnitEnum|null $navigationGroup = 'eCommerce Panel';
    protected static ?int $navigationSort = 5;


    public static function form(Schema $schema): Schema
    {
        return HelpTicketForm::form($schema);
    }

    public static function table(Table $table): Table
    {
        return HelpTicketsTable::table($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }
    public static function canCreate(): bool
{
    return false;
}

    public static function getPages(): array
    {
        return [
            'index' => ListHelpTickets::route('/'),
          
            'edit' => EditHelpTicket::route('/{record}/edit'),
        ];
    }
}
